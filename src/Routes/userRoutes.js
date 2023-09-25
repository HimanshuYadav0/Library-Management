const mongoose = require('mongoose');
const express = require('express');
const Fine = mongoose.model('Fine');
const Books = mongoose.model('Books');
const IssuedBooks = mongoose.model('IssuedBooks');
const ReturnedBooks = mongoose.model('ReturnedBooks');
const RequestedBooks = mongoose.model('RequestedBooks');
const jwt = require('jsonwebtoken');
const requireAuth = require('./requireAuth');

const getdate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
}
const returndate = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    var dd = targetDate.getDate();
    var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = targetDate.getFullYear();

    var dateString = `${dd}/${mm}/${yyyy}`;
    return dateString
}
const checkFine = (book) => {
    let fine = 0;
    const rn_arr = book.returnedOn.split('/');
    const due_arr = book.dueDate.split('/');

    const rnDate = new Date(rn_arr[2], rn_arr[1] - 1, rn_arr[0]);   //Date(yyyy,mm,dd), months start from 0 in JS so subtract 1
    const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);

    if (rnDate > dueDate) {
        const Difference_In_Time = rnDate.getTime() - dueDate.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        fine = (Difference_In_Days * 5);
    }
    return fine;

}
// route.post('/delete-issue', async (req, res) => {
//     const { isbn } = req.body;
//     if (!isbn) res.send("invalid book");

//     console.log(isbn);
//     try {
//         console.log("searching..");
//         const book = await IssuedBooks.findOneAndDelete({ isbn: isbn, userId: req.user._id });
//         console.log("deleted book -" + book);

//         const newbook = new ReturnedBooks({ name: book.Name, author: book.author, isbn: book.isbn, issuedOn: book.issuedOn, dueDate: book.dueDate, returnedOn: getDate(), image: book.image, userId: req.user._id });
//         await newbook.save();

//         try {
//             //update the copies of returned book
//             const books = await Books.find({ isbn: isbn });
//             const copy = parseInt(books[0].copies) + 1;
//             await Books.updateOne(
//                 { isbn: isbn },
//                 { $set: { copies: copy } }
//             )

//             //update returned book fine
//             const BookFine = checkFine(newbook);
//             await ReturnedBooks.updateOne(
//                 { isbn: newbook.isbn, userId: req.user._id },
//                 { $set: { fine: BookFine } }
//             )
//             const returnedBooks = await ReturnedBooks.find({ isbn: book.isbn, userId: req.user._id });

//             //updating user fine
//             const userData = await Fine.find({ userId: req.user._id });
//             let new_fine = parseInt(userData[0].fine) + returnedBooks[0].fine;
//             console.log("updated user fine =" + new_fine);

//             const data = await Fine.updateOne(
//                 { userId: req.user._id },
//                 {
//                     $set: { fine: new_fine }
//                 }
//             )
//         }
//         catch (e) {
//             console.log(e);
//         }

//         res.send("Book Returned succesfully");
//     }
//     catch (e) {
//         console.log(e);
//     }

// })

const route = express.Router();
route.use(requireAuth);
route.get('/getfine', async (req, res) => {

    const data = await Fine.find({ userId: req.user._id });

    res.send(data);
})
route.post('/updatefine', async (req, res) => {
    const { updatefine } = req.body;
    if (!updatefine) return res.send("something went wrong");
    try {
        const datas = await Fine.find({ userId: req.user._id });
        let fined = parseInt(datas[0].fine) + updatefine;
        // console.log(fines);
        const data = await Fine.updateOne(
            { userId: req.user._id },
            {
                $set: { fine: fined }
            }
        )
        res.send(data);
    }
    catch (e) {
        console.log(e);
    }
})

route.get('/getissuebooks', async (req, res) => {
    try {
        const data = await IssuedBooks.find({ userId: req.user._id })
        res.send(data);
    }
    catch (e) {
        console.log(e);
    }
})

route.post('/issued-books', async (req, res) => {
    const { Name, image, author, isbn, IssuedOn, returnDate } = req.body;

    if (!Name || !image || !author || !isbn || !IssuedOn || !returnDate) return res.send("something went wrong");

    try {
        const value = await IssuedBooks.find({ userId: req.user._id, isbn: isbn })
        console.log(value);
        if (value.length == 0) {

            console.log("d");
            const book = new IssuedBooks({ Name, image, author, isbn, IssuedOn, returnDate, userId: req.user._id });
            await book.save();
            const books = await Books.find({ isbn: isbn });
            const copy = parseInt(books[0].copies) - 1;
            await Books.updateOne(
                { isbn: isbn },
                { $set: { copies: copy } }
            )
            console.log("created");
            res.send(book);
        }
        else {
            res.send("book already issued");
        }
    }
    catch (e) {
        console.log(e);
    }
})

route.get('/getreturnbooks', async (req, res) => {
    try {
        const data = await ReturnedBooks.find({ userId: req.user._id })
        res.send(data);
    }
    catch (e) {
        console.log(e);
    }
})
route.post('/returned-books', async (req, res) => {
    const { Name, image, author, isbn, issuedOn, returnedOn } = req.body;
    console.log(req.body);
    if (!Name || !author || !isbn || !issuedOn || !returnedOn || !image) return res.send("something went wrong");

    try {
        const book = new ReturnedBooks({ Name, image, author, isbn, issuedOn, returnedOn, userId: req.user._id });
        await book.save();
        try {
            const books = await Books.find({ isbn: isbn });
            const copy = parseInt(books[0].copies) + 1;
            await Books.updateOne(
                { isbn: isbn },
                { $set: { copies: copy } }
            )
        }
        catch (e) {
            console.log("book not found");
        }

    }
    catch (e) {
        console.log(e);
    }
})

route.get('/searchs/:key', async (req, res) => {
    const query = req.params.field;
    console.log(req.params.key);
    console.log(query);
    let data = await Books.find({
        "$or": [
            { name: { $regex: req.params.key, $options: "i" } }
        ]
    })
    console.log(data);
    res.send(data);
})
route.get('/searchm/:key/:value', async (req, res) => {
    const key = req.params.key;
    let data = await Books.find({
        "$or": [
            { [key]: { $regex: req.params.value, $options: "i" } }
        ]
    })
    console.log(data);
    res.send(data);
})
route.get('/search/isbn/:key', async (req, res) => {
    const query = req.params.field;
    console.log(req.params.key);
    console.log(query);
    let data = await Books.find({ isbn: req.params.key })
    const copy = data[0].copies;
    console.log(copy);
    res.send(data);
})
// route.get('/allbooks', async (req, res) => {
//     // const query = req.params.field;
//     // console.log(req.params.key);
//     // console.log(query);
//     try {
//         let data = await Books.find({})
//         // const copy = data[0].copies;
//         // console.log(copy);
//         res.send(data);

//     } catch (error) {
//         console.log(error);

//     }

// })

route.post('/delete-issue', async (req, res) => {
    const { isbn } = req.body;
    if (!isbn) return res.send("invalid book");
    console.log(isbn);
    try {
        console.log("searching..");
        const book = await IssuedBooks.findOneAndDelete({ isbn: isbn, userId: req.user._id });
        const newbook = new ReturnedBooks({ Name: book.Name, image: book.image, author: book.author, isbn: book.isbn, IssuedOn: book.IssuedOn, dueDate: book.returnDate, returnedOn: getdate(), userId: req.user._id });
        await newbook.save();
        try {
            const books = await Books.find({ isbn: isbn });
            const copy = parseInt(books[0].copies) + 1;
            await Books.updateOne(
                { isbn: isbn },
                { $set: { copies: copy } }
            )
            //update fine
            const BookFine = checkFine(newbook);
            await ReturnedBooks.updateOne(
                { isbn: newbook.isbn, userId: req.user._id },
                { $set: { fine: BookFine } }
            )
            const returnedBooks = await ReturnedBooks.find({ isbn: book.isbn, userId: req.user._id });

            //updating user fine
            const userData = await Fine.find({ userId: req.user._id });
            let new_fine = parseInt(userData[0].fine) + returnedBooks[0].fine;
            console.log("updated user fine =" + new_fine);

            const data = await Fine.updateOne(
                { userId: req.user._id },
                {
                    $set: { fine: new_fine }
                }
            )
        }
        catch (e) {
            console.log(e);
        }
        res.send("dlee");
    }
    catch (e) {
        console.log(e);
    }

})

// route.post('/deletebook',async(req,res)=>{
//     const{isbn} = req.body;
//     if(!isbn) return res.send('invalid book');
//     try{
//        await Books.findOneAndDelete({isbn:isbn});
//         res.send("done");
//     }
//     catch(e){
//         console.log(e);
//     }
// })


route.post('/request', async (req, res) => {
    const { bookName, author } = req.body;
    if (!bookName || !author) return res.send("wrong info");
    console.log(req.user.name);
    try {
        const request = new RequestedBooks({ name: bookName, author, userEmail: req.user.email, userId: req.user._id })
        console.log(request);
        await request.save();
        res.send("done");
    }
    catch (e) {
        console.log(e);
    }
})

route.get('/getrequest', async (req, res) => {
    try {
        const response = await RequestedBooks.find({});
        res.send(response);
    }
    catch (e) {
        console.log(e);
    }
})

// route.post('/deletereq',async(req,res)=>{
//     const {name} = req.body;
//     console.log(name);
//     if(!name)return res.send("invalid book");
//     try{

//         await RequestedBooks.findOneAndDelete({name:name});
//         res.send("done");
//     }
//     catch(e){
//         console.log(e);
//     }
// })

route.post('/addbook', async (req, res) => {
    const { image, name, author, book_depository_stars, isbn, category, copies } = req.body;
    console.log(req.body);
    if (!image || !name || !author || !book_depository_stars || !isbn || !category) return res.send("invalid");
    try {
        const BOOK = new Books({ image, name, author, book_depository_stars, isbn, category, copies });
        await BOOK.save();
        console.log("created done");
        res.send("created done");
    }
    catch (e) {
        console.log(e);
    }
})

route.post('/deletebook', async (req, res) => {
    const { isbn } = req.body;
    if (!isbn) return res.send("invalid isbn");
    try {
        const isIssued = await IssuedBooks.findOne({ isbn });
        if (isIssued === null) {
            const book = await Books.findOneAndDelete({ isbn });
            res.send("Book deleted successfully");
        }
        else {
            res.send("Book is currently issued");
        }
    }
    catch (e) {
        console.log(e);
    }
})
route.get('/requestedBooks-status', async (req, res) => {
    try {
        const requests = await RequestedBooks.find({ userId: req.user._id });
        console.log(requests);
        res.send(requests);
    }
    catch (e) {
        console.log(e);
    }
})
route.post('/updatestatus/:key/:option', async (req, res) => {
    console.log(req.body);
    const option = req.params.option;
    if (option === 'rejected') {
        try {
            await RequestedBooks.findOneAndUpdate({ _id: req.params.key }, { status: "Rejected" })
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        try {
            await RequestedBooks.findOneAndUpdate({ _id: req.params.key }, { status: "Approved" })
        }
        catch (e) {
            console.log(e);
        }
    }
})

route.post('/updateBook', async (req, res) => {
    console.log(req.body);
    if (!req.body) return res.send("invalid updates");
    try {
        const response = await Books.findOneAndUpdate({ _id: req.body._id }, { image: req.body.image, name: req.body.name, author: req.body.author, book_depository_stars: req.body.book_depository_stars, isbn: req.body.isbn, category: req.body.category, copies: req.body.copies }, { new: true })
        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = route;