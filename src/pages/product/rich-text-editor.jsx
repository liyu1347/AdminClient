import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import _ from 'lodash'


 export default class RichTextEditor extends Component {
  static propsTypes = {
      detail: PropTypes.string
  }
  state = {
    editorState: EditorState.createEmpty(),
  }

 

  onEditorStateChange = _.debounce((editorState) => {
    this.setState({
        editorState,
    });
  }, 500)

uploadImageCallBack = (file) => { //执行器
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }


  componentWillMount () {
    const detail = this.props.detail
    if (detail) {
        //根据detail 生成一个editorState
          const editorState = 
        //更新状态
        this.setState({
            editorState
        })
    }
}

  
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{height: 200, border: '1px solid black', paddingLeft: 10}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar = {{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true }}
          }}
        />
        
      </div>
    );
  }
}