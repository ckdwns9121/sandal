import React from 'react';
import styles from './Addr.module.scss';
import { Button } from '@material-ui/core';
import Cross from '../svg/counter/Cross';

const DeliveryrItem = (props) => {

    /* 
        최근 배달 주소를 보여줄 컴포넌트
    */
   const {addr1,addr2,lat,lng} = props;


    return (
        <Button className={styles['delivery-item']} onClick={props.onClick}>
            <div className={styles['item-box']}>
                <JibunAddrBox jibunAddr={addr1}></JibunAddrBox>
                <RoadAddrBox roadAddr={addr2}></RoadAddrBox>
                <div className={styles['item-remove']} 
                 onClick={(e) => {
                    e.stopPropagation();
                    props.onRemove();
                }}
                 
                 >
                    <Cross color="#777" angle={45} />
                </div>
            </div>
 
        </Button>
    )
}
const JibunAddrBox = ({ jibunAddr }) => {
    return (
        <div className={styles['jibun-box']}>
            {jibunAddr}
        </div>
    )
}
const RoadAddrBox = ({ roadAddr }) => {
    return (
        <div className={styles['roadAddr-box']}>
            <AddrBtn />
            <span className={styles['roadAddr-content']}>{roadAddr}</span>
        </div>
    )
}
const AddrBtn = () => {
    return (
        <div className={styles['btn']}>
            도로명
        </div>
    )
}

export default DeliveryrItem;