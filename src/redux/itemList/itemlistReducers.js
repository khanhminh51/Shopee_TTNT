import {
  ADDTOCART,
  GETDETAILITEM,
  GETLISTCATEGORY,
  TINHTONG,
} from './itemlistTypes';

const initialData = {
  itemListData: [
    {
      ID: 'G001',
      Name: 'Áo thun Marvel Captain America',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/October2022/anh-mau-ao-thun-marvel-captain-america-quote-xanh-navy-6.jpg',
      Desc: 'Là sản phẩm của sự hợp tác giữa Coolmate và Disney - đơn vị sở hữu bản quyền Marvel. Chiếc áo nam có thành phần là sợi tái chế tại Việt Nam, hướng tới sự bền vững trong ngành may mặc.',
      Category: [{Tag: 'Áo thun'}],
      Price: 299000,
    },
    {
      ID: 'G002',
      Name: 'Áo thun nam Cotton Compact',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2021/xamkso_13.jpg',
      Desc: 'Là sản phẩm của sự hợp tác giữa Coolmate và Disney - đơn vị sở hữu bản quyền Marvel. Chiếc áo nam có thành phần là sợi tái chế tại Việt Nam, hướng tới sự bền vững trong ngành may mặc.',
      Category: [{Tag: 'Áo thun'}],
      Price: 259000,
    },
    {
      ID: 'G003',
      Name: 'Áo Tank Top thể thao nam Recycle Active',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/_MG_2334v12.jpg',
      Desc: 'Một chiếc áo sát nách thể thao nam thoáng mát tối đa sẽ giúp cho bạn thoải mái vận động tự nhiên, sợi tính năng Quick-dry giúp vải có khả năng thấm hút mồ hôi nhanh và thoát nhiệt tốt , kiểu dệt Twill (chéo) mới mang lại cảm giác thoải mái khi mặc',
      Category: [{Tag: 'Áo tank top'}],
      Price: 199000,
    },
    {
      ID: 'G004',
      Name: 'Áo sát nách thể thao nam Dri-Breathe',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2022/thumb_sat_nach_trang.jpg',
      Desc: 'Một chiếc áo sát nách thể thao nam thoáng mát tối đa sẽ giúp cho bạn thoải mái vận động tự nhiên, sợi tính năng Quick-dry giúp vải có khả năng thấm hút mồ hôi nhanh và thoát nhiệt tốt , kiểu dệt Twill (chéo) mới mang lại cảm giác thoải mái khi mặc',
      Category: [{Tag: 'Áo tank top'}],
      Price: 159000,
    },
    {
      ID: 'G005',
      Name: 'Outlet - Áo sát nách thể thao nam',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/October2022/sat-nach-xanh-bong-dem.jpg',
      Desc: 'Một chiếc áo sát nách thể thao nam thoáng mát tối đa sẽ giúp cho bạn thoải mái vận động tự nhiên, sợi tính năng Quick-dry giúp vải có khả năng thấm hút mồ hôi nhanh và thoát nhiệt tốt , kiểu dệt Twill (chéo) mới mang lại cảm giác thoải mái khi mặc',
      Category: [{Tag: 'Áo tank top'}],
      Price: 199000,
    },
    {
      ID: 'G006',
      Name: 'Áo thun Marvel Thor Graphics Avengers',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/ffDSC04362_copy.jpg',
      Desc: 'Là sản phẩm của sự hợp tác giữa Coolmate và Disney - đơn vị sở hữu bản quyền Marvel. Chiếc áo nam có thành phần là sợi tái chế tại Việt Nam, hướng tới sự bền vững trong ngành may mặc.',
      Category: [{Tag: 'Áo thun'}],
      Price: 299000,
    },
    {
      ID: 'G007',
      Name: 'Outlet - Áo sát nách thể thao nam thoáng khí',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2022/thumb_sat_nach_xam.jpg',
      Desc: 'Một chiếc áo sát nách thể thao nam thoáng mát tối đa sẽ giúp cho bạn thoải mái vận động tự nhiên, sợi tính năng Quick-dry giúp vải có khả năng thấm hút mồ hôi nhanh và thoát nhiệt tốt , kiểu dệt Twill (chéo) mới mang lại cảm giác thoải mái khi mặc',
      Category: [{Tag: 'Áo tank top'}],
      Price: 159000,
    },
    {
      ID: 'G008',
      Name: 'Áo Tank top thể thao nam thoáng khí',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2022/DSC04624-Edit-copy.jpg',
      Desc: 'Một chiếc áo sát nách thể thao nam thoáng mát tối đa sẽ giúp cho bạn thoải mái vận động tự nhiên, sợi tính năng Quick-dry giúp vải có khả năng thấm hút mồ hôi nhanh và thoát nhiệt tốt , kiểu dệt Twill (chéo) mới mang lại cảm giác thoải mái khi mặc',
      Category: [{Tag: 'Áo tank top'}],
      Price: 189000,
    },
    {
      ID: 'G009',
      Name: 'Áo sơ mi nam dài tay Café-DriS',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2021/uIMG_0978_copy.jpg',
      Desc: 'Co giãn tự nhiên tạo cảm giác thoải mái. Mỏng nhẹ và thấm hút mồi hôi giúp bạn luôn khô thoáng. Nguyên liệu bền vững, thân thiện với môi trường.',
      Category: [{Tag: 'Áo sơ mi'}],
      Price: 399000,
    },
    {
      ID: 'G010',
      Name: 'Áo sơ mi nam dài tay Café Sticky',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/June2022/CoolMate0538.jpg',
      Desc: 'Co giãn tự nhiên tạo cảm giác thoải mái. Mỏng nhẹ và thấm hút mồi hôi giúp bạn luôn khô thoáng. Nguyên liệu bền vững, thân thiện với môi trường.',
      Category: [{Tag: 'Áo sơ mi'}],
      Price: 399000,
    },
    {
      ID: 'G011',
      Name: 'Áo Polo nam Pique Cotton USA',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC04936-copy-1.jpg',
      Desc: 'Chất liệu: 97% Cotton USA + 3% Spandex, co giãn 4 chiều Phù hợp với: đi làm, đi chơi, mặc ở nhà Kiểu dáng: áo hơi ôm eo và phù hợp với dáng nam giới Việt',
      Category: [{Tag: 'Áo Polo'}],
      Price: 299000,
    },
    {
      ID: 'G012',
      Name: 'Áo Polo thể thao nam ProMax-S1',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2022/_MG_0137_2.jpg',
      Desc: 'Một chiếc áo Polo thể thao nam Promax-S1 đã được ra mắt vào đúng thời điểm mùa hè này để đảm bảo khách hàng nhà Coolmate luôn được thoải mái, dễ chịu mà vẫn lịch sự trong bất kỳ trường hợp nào. Một chiếc áo polo nam hàng hiệu, lịch sự với những sự chỉnh chu và tỉ mỉ của những chiếc cúc áo.',
      Category: [{Tag: 'Áo Polo'}],
      Price: 249000,
    },
    {
      ID: 'G013',
      Name: 'Áo Polo thể thao nam ProMax-S1',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2021/pros123.jpeg',
      Desc: 'Một chiếc áo Polo thể thao nam Promax-S1 đã được ra mắt vào đúng thời điểm mùa hè này để đảm bảo khách hàng nhà Coolmate luôn được thoải mái, dễ chịu mà vẫn lịch sự trong bất kỳ trường hợp nào.',
      Category: [{Tag: 'Áo Polo'}],
      Price: 259000,
    },
    {
      ID: 'G014',
      Name: 'Áo Polo thể thao nam ProMax-S3',
      img: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/s3-13-5.jpg',
      Desc: 'Chất liệu: 56% Polyester PET high stretch + 44% Polyester PTT Sorona Kiểu dáng: Slightly Slim, cổ viền vải chính, có xẻ tà vạt trước sau Phù hợp với: đi làm, đi chơi, ở nhà Vải EXCOOL là vải có ưu điểm vượt trội: mềm mại, thấm hút và nhanh khô',
      Category: [{Tag: 'Áo Polo'}],
      Price: 229000,
    },
  ],

  categoryData: [
    {Tag: 'All'},
    {Tag: 'Áo tank top'},
    {Tag: 'Áo thun'},
    {Tag: 'Áo sơ mi'},
    {Tag: 'Áo Polo'},
  ],

  detailItem: {},
  cart: [],
  data: [],
  TongTien: 0,
};

export default function itemlist(state = initialData, action) {
  switch (action.type) {
    case GETLISTCATEGORY:
      if (action.itemtag === 'All') {
        return {
          ...state,
          data: state.itemListData,
        };
      } else {
        return {
          ...state,
          data: state.itemListData.filter(item => {
            for (let i = 0; i < item.Category.length; i++) {
              if (item.Category[i].Tag === action.itemtag) {
                return item;
              }
            }
          }),
        };
      }

    case GETDETAILITEM:
      return {
        ...state,
        detailItem: state.itemListData.find(item => item.ID === action.itemId),
      };

    case ADDTOCART:
      const item = state.itemListData.find(item => item.ID === action.itemId);
      console.log(item);
      return {
        ...state,
        cart: [...state.cart, item],
      };

    default:
      return state;
  }
}
