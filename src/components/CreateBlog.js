import { useEffect, useState } from "react"

const CreateBlog = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        props.setBlogAddSuccess(false)

        props.handleCreateBlog(title, author, url)
    }

    useEffect(() => {
        if (props.blogAddSuccess) {
            resetForm()
        }
    }, [props.blogAddSuccess])

    const resetForm = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create New blog</h3>
            <form onSubmit={addBlog}>
                <div className="input-wrap">
                    <label htmlFor="title">Title</label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    ></input>
                </div>
                <div className="input-wrap">
                    <label htmlFor="author">Author</label>
                    <input
                    id="author"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    ></input>
                </div>
                <div className="input-wrap">
                    <label htmlFor="url">URL</label>
                    <input
                    id="url"
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}
                    ></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog