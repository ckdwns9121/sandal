import React, { useState } from 'react';
import { Paths } from 'paths';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TitleBar from 'components/titlebar/TitleBar';
import styles from './MyPage.module.scss';
import styled from 'styled-components';
import Profile from 'components/svg/sign/profile.png';
import BottomNav from 'components/nav/BottomNav';
import classNames from 'classnames/bind';
import { localLogout } from '../../api/auth/auth';
import { logout } from '../../store/auth/auth';
import Button from '@material-ui/core/Button';
import { numberFormat } from '../../lib/formatter';

import Back from 'components/svg/header/Back';
import { Link } from 'react-router-dom';
import Loading from '../../components/asset/Loading';

const cx = classNames.bind(styles);

const MyPageContainer = () => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const onClickLogin = () => {
        history.push(Paths.ajoonamu.signin);
    };
    const onClickAccount = () => {
        history.push(Paths.ajoonamu.account);
    };
    const onClickLogout = async () => {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        const res = await localLogout(token);
        sessionStorage.removeItem('access_token');
        if (res.message === '로그아웃에 성공하셨습니다.') {
            dispatch(logout());
            history.push(Paths.index);
        }
        setLoading(false);
    };

    return (
        <>
            <Loading open={loading} />
            <TitleBar title={'마이페이지'} />
            <div className={styles['container']}>
                <Button
                    className={styles['user-info']}
                    onClick={user ? onClickAccount : onClickLogin}
                >
                    <div className={cx('profile', 'pd-left')}>
                        <img src={Profile} alt={'이미지'} />
                    </div>
                    <div className={cx('info', 'pd-box')}>
                        <div className={styles['auth']}>
                            {user ? (
                                <div className={styles['name']}>
                                    <span>{user.name}</span> 님 반갑습니다!
                                </div>
                            ) : (
                                '로그인을 해주세요'
                            )}
                        </div>
                        {user && (
                            <div className={styles['point']}>
                                <span className={styles['name']}>
                                    보유 포인트
                                </span>
                                <span className={styles['value']}>
                                    {numberFormat(user.point)}P
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cx('link', 'pd-right')}>
                        <Back rotate="180deg" />
                    </div>
                </Button>
                <div className={styles['tab']}>
                    <Item url={`${Paths.ajoonamu.support}/notice`} text={'공지사항'} />
                    <Item text={'이벤트'} />
                    <Item url={`${Paths.ajoonamu.support}/faq`} text={'자주 묻는 질문'} />
                    <Item url={`${Paths.ajoonamu.support}/qna/send`} text={'1:1 문의'} />
                    <Item text={'알림설정'} />
                    <Item text={'버전정보'} />
                    {user && <Item text={'이용약관'} />}
                </div>
                {user && (
                    <div className={styles['logout']} onClick={onClickLogout}>
                        <Button className={styles['logout-btn']}>
                            <div className={styles['pd-btn']}>로그아웃</div>
                        </Button>
                    </div>
                )}
            </div>
            <BottomNav />
        </>
    );
};

const SupportLink = styled(Link)`
    & + & {
        border-top: solid 1px #F9F9F9;
    }
`;

const Item = ({ text, url }) => {
    return (
        <SupportLink to={url}>
            <Button className={styles['pd-box']}>
                <div className={styles['item']}>{text}</div>
            </Button>
        </SupportLink>
    );
};

Item.defaultProps = {
    url: "/"
};

export default MyPageContainer;
