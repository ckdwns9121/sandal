import React from 'react';
import styles from './Review.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewItem from './ReviewItem';

// 슬릭추가
export default ({ reviewList, onClick }) => (
    <div className={styles['container']}>
        <p className={styles['title']}>포토리뷰</p>
        <div className={styles['review-list']}>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                loop
                loopedSlides={2}
                freeMode
                slidesPerView={2}
            >
                {reviewList.map(
                    ({
                        email,
                        review_id,
                        review_body,
                        review_images,
                        review_rating,
                    }) => (
                        <SwiperSlide key={review_id}>
                            <ReviewItem
                                email={email}
                                body={review_body}
                                images={review_images}
                                rating={review_rating}
                                onClick={() => onClick(review_id)}
                            />
                        </SwiperSlide>
                    ),
                )}
            </Swiper>
        </div>
    </div>
);
