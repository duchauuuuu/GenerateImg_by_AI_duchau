import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon
}

export const stepsData = [
    {
      title: 'Mô tả tầm nhìn của bạn',
      description: 'Nhập một cụm từ, câu hoặc đoạn văn mô tả hình ảnh bạn muốn tạo.',
      icon: step_icon_1,
    },
    {
      title: 'Chứng kiến điều kỳ diệu',
      description: 'Công cụ AI tiên tiến của chúng tôi sẽ biến văn bản của bạn thành một hình ảnh độc đáo, chất lượng cao trong vài giây.',
      icon: step_icon_2,
    },
    {
      title: 'Tải xuống & Chia sẻ',
      description: 'Tải xuống ngay lập tức tác phẩm của bạn hoặc chia sẻ nó với thế giới trực tiếp từ nền tảng của chúng tôi.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
        image:profile_img_1,
        name:'Đức Hậu',
        role:'Nhà thiết kế đồ họa',
        stars:5,
        text:`Tôi đã sử dụng Imagify - H trong gần hai năm, chủ yếu là cho Instagram và công cụ này cực kỳ thân thiện với người dùng, giúp công việc của tôi dễ dàng hơn nhiều.`
    },
    {
        image:profile_img_2,
        name:'Thanh Nhã',
        role:'Người sáng tạo nội dung',
        stars:4,
        text:`Tôi đã sử dụng Imagify - H trong gần hai năm, chủ yếu là cho Instagram và công cụ này cực kỳ thân thiện với người dùng, giúp công việc của tôi dễ dàng hơn nhiều.`
    },
    {
        image:profile_img_1,
        name:'Minh Tâm',
        role:'Nhà thiết kế đồ họa',
        stars:5,
        text:`Tôi đã sử dụng Imagify - H trong gần hai năm, chủ yếu là cho Instagram và công cụ này cực kỳ thân thiện với người dùng, giúp công việc của tôi dễ dàng hơn nhiều.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 100000,
      credits: 100,
      desc: 'Tốt nhất cho mục đích sử dụng cá nhân.'
    },
    {
      id: 'Advanced',
      price: 500000,
      credits: 500,
      desc: 'Tốt nhất cho mục đích sử dụng kinh doanh.'
    },
    {
      id: 'Business',
      price: 2500000,
      credits: 5000,
      desc: 'Tốt nhất cho mục đích sử dụng doanh nghiệp.'
    },
  ]