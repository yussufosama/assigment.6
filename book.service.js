import {book_model} from "../../main.js"

export const get_all_books=async ()=>{
    let data = await book_model.find().toArray()
    if (data.length>0){
        return data
    }else{
        return {message : "no books found"}
    }
}

export const create_title_index = async () => {
    let data = await book_model.createIndex({ title: 1 })
    return data
}

export const add_book= async (body)=>{
    let{ title,author, year,genres}=body
    let data = await book_model.insertOne({title,author,year,genres})
    return body
}

export const add_multiple_books = async (body) => {
    const data = await book_model.insertMany(body)
    
    return { body
    }
}

export const update_book_year = async (body) => {
    let {title,year}=body
    const data = await book_model.updateOne({title,year})
    return data
}

export const get_book_by_id= async (query)=>{
    let {title}=query
    const book = await book_model.findOne({ title })
    return book
}
export const get_books_by_year_range = async (query) => {
    let { from, to } = query
    const books = await book_model.find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray()
    return books
}
export const get_books_by_genre = async (query) => {
    let { genre } = query
    const books = await book_model.find({ genres: genre }).toArray()
    return books
}
export const get_books_skip_limit = async () => {
    const books = await book_model.find()
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray()
    return books
}
export const get_books_by_year_integer = async () => {
    const books = await book_model.find({ year: { $type: "int" } }).toArray()
    return books
}
export const get_books_exclude_genres = async () => {
    const books = await book_model.find({
        genres: { $nin: ["Horror", "Science Fiction"] }
    }).toArray()
    return books
}
export const delete_books_before_year = async (query) => {
    let { year } = query
    const result = await book_model.deleteMany({
        year: { $lt: Number(year) }
    })
    return result
}
export const aggregate_books_after_2000 = async () => {
    const books = await book_model.aggregate([
        { 
            $match: { year: { $gt: 2000 } } 
        },
        { 
            $sort: { year: -1 } 
        }
    ]).toArray()
    return books
}
export const aggregate_books_title_author_year = async () => {
    const books = await book_model.aggregate([
        { 
            $match: { year: { $gt: 2000 } } 
        },
        { 
            $project: { 
                _id: 0, 
                title: 1, 
                author: 1, 
                year: 1 
            } 
        }
    ]).toArray()
    return books
}
export const aggregate_books_unwind_genres = async () => {
    const books = await book_model.aggregate([
        { 
            $unwind: "$genres" 
        }
    ]).toArray()
    return books
}
export const aggregate_books_join_logs = async () => {
    const books = await book_model.aggregate([
        {
            $lookup: {
                from: "log",
                localField: "title",
                foreignField: "bookTitle", 
                as: "book_logs"         
            }
        }
    ]).toArray()
    return books
}
