import React, { useEffect, useState, useCallback } from 'react';
// route
import { Paths } from 'paths';
import { useHistory } from 'react-router-dom';
// style
import styles from './OrderComplete.module.scss';
import classNames from 'classnames/bind';

// components
import { Button } from '@material-ui/core';
import DetailOrderItemList from '../../components/order/DetailOrderItemList';
import PhraseServiceModal from '../../components/modal/PhraseServiceModal';

// hooks
import { useModal } from '../../hooks/useModal';
import { useStore } from '../../hooks/useStore';
import { useSelector } from 'react-redux';

// api
import { order_cancle } from '../../api/order/order';
import { getDetailOrderView } from '../../api/order/orderItem';
import { noAuthOrderView, noAutuOrderCancle } from '../../api/noAuth/order';
import Loading from '../../components/asset/Loading';

//lib
import { numberFormat, stringToTel } from '../../lib/formatter';

const cx = classNames.bind(styles);

const OrderCompleteContainer = ({ order_number }) => {
    const user_token = useStore(false);
    const { user } = useSelector((state) => state.auth);
    const openModal = useModal();
    const history = useHistory();
    const [phraseOpen, setPhraseOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    // const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);
    // const [payinfo, setPayInfo] = useState(null);
    // const [payple_info, setPaypleInfo] = useState(null);

    const handlePhraseOpen = () => setPhraseOpen(true);
    const handlePhrasetClose = () => setPhraseOpen(false);

    const onClickHome = () => {
        history.push(Paths.index);
    };

    const getOrderInfo = useCallback(async () => {
        setLoading(true);
        try {
            let res = null;
            if (user_token) {
                res = await getDetailOrderView(user_token, order_number);
            } else {
                res = await noAuthOrderView(order_number);
            }

            const { orders } = res;
            if (orders === undefined) {
                openModal(
                    '주문번호가 존재하지 않습니다.',
                    '주문번호를 확인해주세요',
                    () => history.replace('/'),
                );
                setSuccess(false);
            } else {
                setOrders(orders);
                setSuccess(true);
            }
        } catch (e) {
            openModal(
                '주문번호가 존재하지 않습니다.',
                '주문번호를 확인해주세요',
                () => history.replace('/'),
            );
        }
        setLoading(false);
    }, [history, openModal, order_number, user_token]);

    useEffect(() => {
        if (!order_number) {
            history.replace('/');
        } else {
            getOrderInfo();
        }
    }, [order_number, getOrderInfo, history]);

    return (
        <>
            {loading ? (
                <Loading open={true} />
            ) : (
                <>
                    {success && (
                        <div className={styles['container']}>
                            <div className={styles['content']}>
                                <div className={styles['title']}>
                                    주문이 완료되었습니다.
                                </div>
                                <div className={styles['order-number']}>
                                    주문번호: {orders.order_id}
                                </div>
                                <div className={styles['bank']}>
                                    <div className={styles['bank-box']}>
                                        <div className={styles['bank-name']}>
                                            입금은행
                                        </div>
                                        <div className={styles['bank-value']}>
                                            국민은행 12345-67-89000 아주나무
                                        </div>
                                    </div>
                                    <div className={styles['bank-box']}>
                                        <div className={styles['bank-name']}>
                                            가상계좌
                                        </div>
                                        <div className={styles['bank-value']}>
                                            유효기간 2020/06/09 00:00:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['order-list']}>
                                <div className={styles['title']}>주문상품</div>
                                <div className={styles['list']}>
                                    <DetailOrderItemList items={orders.items} />
                                </div>
                                <div className={cx('title', 'between')}>
                                    <div>배달 정보</div>
                                    <div className={styles['order-type']}>
                                        {orders.info.order_type === 'reserve'
                                            ? '예약주문'
                                            : '배달주문'}
                                    </div>
                                </div>
                                <div className={styles['list']}>
                                    <UserInfo
                                        value1={orders.info.s_name}
                                        value2={`${orders.s_addr1} ${orders.s_addr2}`}
                                        value3={stringToTel(orders.info.s_hp)}
                                    />
                                </div>
                                <div className={styles['title']}>주문정보</div>
                                <div className={styles['list']}>
                                    <UserInfo
                                        value1={orders.info.s_name}
                                        value2={stringToTel(orders.info.s_hp)}
                                        value3={user && user.email}
                                    />
                                </div>
                                <div className={styles['title']}>매장정보</div>
                                <div className={styles['list']}>
                                    <UserInfo
                                        value1={orders.shop_name}
                                        value2={`${orders.shop_addr1} ${orders.shop_addr2}`}
                                        value3={stringToTel(orders.shop_hp)}
                                    />
                                </div>
                                <div className={styles['title']}>결제정보</div>
                                <div className={styles['list']}>
                                    <PaymentInfo
                                        text={'주문번호'}
                                        value={orders.order_id}
                                    />
                                    <PaymentInfo
                                        text={'주문일시'}
                                        value={orders.receipt_time}
                                    />
                                    <PaymentInfo
                                        text={'결제방식'}
                                        value={'가상계좌 입금'}
                                    />
                                    <PaymentInfo
                                        text={'결제금액'}
                                        value={`${numberFormat(
                                            orders.receipt_price,
                                        )}원`}
                                    />
                                    <PaymentInfo
                                        text={'입금자명'}
                                        value={orders.info.s_name}
                                    />
                                    {/* <PaymentInfo text={'입금계좌'} value={'국민은행 12345-67-89000 아주나무'} />
                                <PaymentInfo text={'가상계좌 유효기간'} value={'2020년 06월 09일 00:00:00'} /> */}
                                </div>
                                <div className={styles['button-box']}>
                                    <Button
                                        className={styles['btn']}
                                        onClick={handlePhraseOpen}
                                    >
                                        문구 서비스 신청
                                    </Button>
                                    <Button
                                        className={cx('btn', { on: true })}
                                        onClick={onClickHome}
                                    >
                                        완료
                                    </Button>
                                </div>
                            </div>
                            <PhraseServiceModal
                                open={phraseOpen}
                                handleClose={handlePhrasetClose}
                                order_number={order_number}
                                token={user_token}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
const UserInfo = ({ value1, value2, value3 }) => (
    <>
        <div className={styles['name']}>{value1}</div>
        <div className={styles['user-info']}>{value2}</div>
        <div className={styles['user-info']}>{value3}</div>
    </>
);
const PaymentInfo = ({ text, value }) => (
    <div className={styles['payment-info']}>
        <div className={styles['info']}>{text}</div>
        <div className={styles['value']}>{value}</div>
    </div>
);

export default OrderCompleteContainer;
