/*global kakao*/
import React,{ useEffect } from 'react';
import classNames from 'classnames/bind';

import { markerdata } from './data';

import Back from 'components/svg/header/Back';
import LinkButtom from 'components/button/LinkButton';

import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import MarkerImg from './MarkerImg.svg';
import styles from './MapModal.module.scss';

const cx = classNames.bind(styles);



//test commit
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        fontSize: 10
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize:14
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    } ,
    content : {
        padding :0,
        paddingLeft :24,
        paddingRight : 24,
        flex : "0 0 auto"
    },
    sub:{
        fontSize:10
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
    const [jibun,setJibun] = React.useState('서울특별시 구로구 구로동 557, 삼성빌딩 407호');
    const [road ,setRoad] = React.useState('새말로v9길 46, 삼성빌딩 407호');

    useEffect(() => {
        console.log(props.open);
        mapScript();
    }, []);

    
    const mapScript = () => {
        console.log("실행");
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
            level: 5,
        };
        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        var imageSrc = MarkerImg,
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 현재 위치 중심으로 마커포지션을 설정.


        // 마커 정보를 가지고 뷰에 띄울 마커 생성
        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            image:markerImage
        });

        const infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

            // 클릭한 위도, 경도 정보를 가져옵니다 
            // var latlng = mouseEvent.latLng;

            // // 마커 위치를 클릭한 위치로 옮깁니다
            // marker.setPosition(latlng);

            // var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';
            // console.log(message);
            // var resultDiv = document.getElementById('clickLatlng');
            // //resultDiv.innerHTML = message;

            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                    
                    // var content = '<div class="bAddr">' +
                    //                 '<span class="title">법정동 주소정보</span>' + 
                    //                 detailAddr + 
                    //             '</div>';
        
                    // 마커를 클릭한 위치에 표시합니다 
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);
                    setJibun(result[0].address.address_name );

                    if(!!result[0].road_address){
                        setRoad(result[0].road_address.address_name);
                    }
        
                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    // infowindow.setContent(content);
                    // infowindow.open(map, marker);
                }   
            });

        });

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
        

        // 나중에 가게 정보 받아올때 띄워야 할 마커
        // markerdata.forEach((el) => {
        //     const marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(el.lat, el.lng),
        //         title: el.title,
        //         clickable: true,
        //         image : markerImage
        //     })


        //     const hstyle = {
        //         color: "black",
        //         backgroundColor: "blue",
        //         fontFamily: "Arial"
        //     }

        //     var iwContent = '<div class="customoverlay" >Hello Wozzzrld!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        //         iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        //     // 인포윈도우를 생성합니다
        //     var infowindow = new kakao.maps.InfoWindow({
        //         content: iwContent,
        //         removable: iwRemoveable
        //     });

        //     // 마커에 클릭이벤트를 등록합니다
        //     kakao.maps.event.addListener(marker, 'click', function () {
        //         // 마커 위에 인포윈도우를 표시합니다
        //         infowindow.open(map, marker);
        //     });

        // });

    };


    return (
        <div>
            <div className={cx('map-modal',{on:props.open})}>
            <div id="map" className={styles['map']} style={{ width: "100vw", height: "100vh" }}></div>
            </div>
            <div className={cx('back',{on:props.open})}>
                    <Back onClick={props.handleClose} stroke ={"#fff"} strokeWidth={"3"}/>
            </div>
            <BottomModal open={props.open} jibun={jibun} road={road}/>
        </div>
    );
}

function BottomModal ({open,jibun,road}){
    return(
        <div className={cx('bottom-modal',{on: open})}>
        <div className={styles['table']}>
            <div className={styles['addr']}>
            <div className={styles['jibun-addr']}>
            {jibun}
             </div>
             <div className={styles['road']}>
                 <div className={styles['box']}>
                    도로명
                 </div>
                <div className={styles['road-addr']}>
                {road}

                </div>
             </div>
             <div className={styles['detail']}>
                <input className={styles['detail-input']}type="text"  placeholder="상세 주소를 입력하세요"/>
             </div>
            </div>
            <LinkButtom title={"이 위치로 배달지 설정"} toggle={true} />
        </div>
    </div>
    )
}

export default FullScreenDialog


