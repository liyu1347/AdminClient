import React from 'react'
import PropTypes from "prop-types"
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '../../api';
import {BASE_IMG} from '../../utils/Constants'


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

 export default class PicturesWall extends React.Component {

  staticpropTyprs = {
      imgs: PropTypes.array
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
     /* {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }*/
     ],
  }

  componentWillMount() {
      //根据传入的imgs生成fileList并更新
      const imgs = this.props.imgs
      if(imgs && imgs.length > 0) {
          const fileList = imgs.map((img, index) => ({
              uid: -index,
              name: img,
              status: 'done',
              url: BASE_IMG + img
          }))
          this.setState({ fileList })
      }
  }

  //获取所有已上传图片文件名的数组
  getImgs = () => this.state.filelist.map(file => file.name)

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({file,  fileList }) =>{
     if(file.status==='done') {
         file = fileList[fileList.length-1]
        //取出响应中的文件的图片名和url
        const {name, url} = file.response.data
        //保存到上传的file对象
        file.name = name
        file.url = url
    } else if(file.status ==='removed'){//删除
        const result = await reqDeleteImg(file.name)
        if (result.status === 0) {
            message.success('删除图片成功')
        } else {
            message.success('删除图片失败')
        }
    }
     this.setState({fileList})
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}