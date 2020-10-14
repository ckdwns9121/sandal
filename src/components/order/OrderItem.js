import React from 'react';
import styles from './Order.module.scss';
import { numberFormat } from '../../lib/formatter';
import { ButtonBase } from '@material-ui/core';

// 전제척인 주문 메뉴 아이템
const OrderItem = (props) => {
    const {
        // id,
        receipt_time,
        items,
        // order_id,
        total_price,
        send_cost,
        cp_price,
        point_price,
        receipt_price,
    } = props;
    return (
        <ButtonBase className={styles['order-item']} onClick={props.onClick}>
            <div className={styles['item']}>
                <div className={styles['menu']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['date']}>{receipt_time}</div>
                        <div className={styles['list']}>
                            <OrderMenuItemList items={items} />
                        </div>
                    </div>
                </div>
                <div className={styles['cost']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['total']}>
                            <span>결제금액</span>
                            {numberFormat(receipt_price)}원
                        </div>
                        <div className={styles['sub']}>
                            주문금액 {numberFormat(total_price)}원 + 배송비{' '}
                            {numberFormat(send_cost)}원 - <br />
                            포인트 할인 {numberFormat(point_price)}원 - 쿠폰
                            할인 {numberFormat(cp_price)}원<br />
                        </div>
                    </div>
                </div>
            </div>
        </ButtonBase>
    );
};

//주문 메뉴 리스트
const OrderMenuItemList = ({ items }) => {
    const list = items.map((item, index) => (
        <OrderMenuItem
            item_name={item.item_name}
            item_option={item.item_option}
            item_price={item.item_price}
            key={index}
        />
    ));

    return <div className={styles['menu-item-list']}>{list}</div>;
};

//주문 메뉴 아이템 (개별)
const OrderMenuItem = ({ item_name, item_option, item_price }) => {
    return (
        <div className={styles['menu-name']}>
            <div className={styles['name']}>{item_name} 1개</div>
            <div className={styles['options']}>
                추가선택 : {item_option ? item_option : '없음'} / 비용 :{' '}
                {numberFormat(item_price)}원
            </div>
        </div>
    );
};

export default React.memo(OrderItem);
