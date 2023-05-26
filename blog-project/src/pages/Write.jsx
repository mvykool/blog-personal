import {useState} from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {

  const [value, setValue] = useState("")

  return (
	<div className="add">
    <div className="content">
      <input type="text" placeholder="title" />
      <div className="editContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
      </div>
      </div>
    <div className="menu">
      <div className="item">
        <h3>publish</h3>
        <span>
          <b>status:</b> draft
        </span>
        <span>
          <b>visibility:</b> public
        </span>
          <input style={{display: "none"}} type="file" id="file" />
          <label htmlFor="file">upload img</label>
          <div className="buttons">
              <button>save as draft</button>
              <button>update</button>
          </div>
      </div>
      <div className="item">
        <h3>category</h3>
        <div className="cat">
          <input type="radio" name="cat" value="art" id="art"/>
          <label htmlFor="art">art</label>
        </div>

        <div className="cat">
          <input type="radio" name="cat" value="science" id="science"/>
          <label htmlFor="science">science</label>
        </div>

        <div className="cat">
          <input type="radio" name="cat" value="technology" id="technology"/>
          <label htmlFor="technology">technology</label>
        </div>
    
        <div className="cat">
          <input type="radio" name="cat" value="cinema" id="cinema"/>
          <label htmlFor="cinema">cinema</label>
        </div>
      
        <div className="cat">
          <input type="radio" name="cat" value="design" id="design"/>
          <label htmlFor="design">design</label>
        </div>
      
        <div className="cat">
          <input type="radio" name="cat" value="food" id="food"/>
          <label htmlFor="food">food</label>
        </div>
      
      </div>
    </div>
  </div>
  )
} 

export default Write