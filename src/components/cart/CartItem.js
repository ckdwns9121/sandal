import React from 'react';
import PropsTypes from 'prop-types';
import styles from './Cart.module.scss';
import Counter from 'components/counter/Counter';
import logo from 'logo.svg';


// 메뉴이름, 추가옵션

const CartItem = props => {


    // const {id,isChecked,handleCheckChild} = props;
    // const {item_img,item_name,item_option_id,item_price,item_quanity} =props.item;
    // const options = props.options;
    // console.log(options);

    const onClick = () => {
        // console.log(options);
    }

    return (
        <div className={styles['cart-item']} onClick={onClick}>
            <div className={styles['pd-box']}>
                <div className={styles['bar']}>
                    {/* <div className={styles['check']}>
                    <input type="checkbox" checked={false}></input>
                </div> */}
                    <div className={styles['delete']}>
                        &times;
                </div>
                </div>
                <div className={styles['item-box']}>
                    <div className={styles['item-img']}>
                        <img src={logo}></img>
                    </div>
                    <div className={styles['item-info']}>
                        <div className={styles['name']}>
                            {/* {item_name} */}
                        과일도시락
                         </div>
                        <div className={styles['options']}>
                            추가선택 없음
                        {/* {
                            options.map(
                                op =>(
                                   op.option_name
                                )
                            )
                        } */}
                        </div>
                        <div className={styles['count-price']}>
                            <div className={styles['price']}>
                                {/* {item_price} */}
                            3000원
                        </div>
                            <div className={styles['count']}>
                                <Counter value={3} />
                                {/* 수량 <Counter value={item_quanity} /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

CartItem.PropsTypes = {
    isChecked: PropsTypes.bool,
}
CartItem.defaultProps = {
    isChecked: false,
}

export default React.memo(CartItem);