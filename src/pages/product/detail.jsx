import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {Card, Icon, List} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { BASE_IMG } from '../../utils/Constants'
import {reqCategory} from '../../api'
import { async } from 'q'
const Item = List.Item

export default class ProductDetail extends Component {
    state = {
        categoryName: ''
    }

    getCategory = async (categoryId) => {
        const result = await reqCategory(categoryId)
        if(result.status === 0) {
            const categoryName = result.data.name
            this.setState({ categoryName})
        }
    }

    componentDidMount () {
        const product = memoryUtils.product
        if(product._id) {
            this.getCategory(product._id)
        }
        //this.getCategory(product._id)
    }
    render() {
            const {categoryName} = this.state
            const product = memoryUtils.product
            debugger
            if(!product || !product._id) {
                return <Redirect to="/product" />
            }
            const title = (
                <span>
                   <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type ="arrow-left"/>
                   </LinkButton>
                   <span>商品详情</span>
                </span>
            )
            
                return (

                    <Card title={title} className="detail">
                        <List>
                            <Item>
                                <span className="detail-left">商品名称：</span>
                                <span>{product}</span>
                            </Item>
                            <Item>
                                <span className="detail-left">商品描述：</span>
                                <span>{product.desc}</span>
                            </Item>
                            <Item>
                                <span className="detail-left">商品价格：</span>
                                <span>{product.price}</span>
                            </Item>
                            <Item>
                                <span className="detail-left">所属分类：</span>
                                <span>{categoryName}</span>
                            </Item>
                            <Item>
                                <span className="detail-left">商品图片：</span>
                                <span>
                                    {
                                        product.imgs.map((img, index) => <img  src={BASE_IMG+img}  key={img}  src=""/>)
                                    }
                                   
                                </span>
                            </Item>
                            <Item>
                                
                                <span className="detail-left">商品详情：</span>
                                <div dangerouslySetInnerHTML={{_html: product.detail}}></div>
                            </Item>
                        </List>
                    </Card>
                )
            
        
    }
}
