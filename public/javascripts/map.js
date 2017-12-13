
    var placeOverlay = new daum.maps.CustomOverlay({zIndex:1});
    var contentNode = document.createElement('div');
    var selectedPlace = null;

    contentNode.className = 'placeinfo_wrap';
    placeOverlay.setContent(contentNode);

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new daum.maps.LatLng(37.569729, 126.974894), // 지도의 중심좌표
          level: 2 // 지도의 확 대 레벨
        };
    var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커를 표시할 위치와 title 객체 
    //http://f.goodkiss.co.kr/naver/navermap.asp
    var positions = [
        {
              place_url: 'http://imqa.io',
              place_name: 'IMQA 비밀 작전 기지 301호',
              road_address_name: '광화문 오피시아 빌딩 301호',
              address_name: '★★★★☆',
              phone: '차용빈 (10,000원)',
              latlng: new daum.maps.LatLng(37.569729, 126.974894)
            },
            {
            place_url: 'https://store.naver.com/restaurants/detail?id=20867980',
            place_name: '화목순대국전문',
            road_address_name: '서울 종로구 새문안로5길 11',
            address_name: '★★★★☆',
            phone: '순대국 (7,000원)',
            latlng: new daum.maps.LatLng(37.5712150,126.9747506)
        },
        {
        place_url: 'https://store.naver.com/restaurants/detail?id=21037935',
        place_name: '돈까스백반',
        road_address_name: '서울 종로구 경희궁1길 5',
        address_name: '★★★☆☆',
        phone: '백반 (12,000원)',
        latlng: new daum.maps.LatLng(37.5709089,126.9713246)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=11619941',
            place_name: '무교동북어국집',
            road_address_name: '서울 중구 을지로1길 38',
            address_name: '★★★★☆',
            phone: '북어해장국 (7,000원)',
            latlng: new daum.maps.LatLng(37.5677482,126.9798480)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=13006904',
            place_name: '덕수정',
            road_address_name: '서울 중구 정동길 41',
            address_name: '★★★★★',
            phone: '부대찌개 (7,000원), 생삽겹살 (7,000원)',
            latlng: new daum.maps.LatLng(37.5658778,126.9725607)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=11666936',
            place_name: '감나무집',
            road_address_name: '서울 종로구 새문안로 83-2',
            address_name: '★★★★☆',
            phone: '닭곰탕 (6,000원)',
            latlng: new daum.maps.LatLng(37.5705978,126.9739253)
        },{
            place_url: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%90%98%EB%8A%94+%EC%A7%91+%EC%A0%84%EA%B3%A8&oquery=%EB%90%98%EB%8A%94%EC%A7%91+%EC%A0%84%EA%B3%A8&tqi=TA%2B4aspySo0ssZ3H%2BAossssss4d-491219',
            place_name: '되는 집 전골',
            road_address_name: '서울특별시 종로구 세종대로23길 54 세종빌딩 지하',
            address_name: '★★★★★',
            phone: '동태찌개 (7,500원)',
            latlng: new daum.maps.LatLng(37.5718605,126.9732967)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=34217178',
            place_name: '오양식관',
            road_address_name: '서울 중구 세종대로21길 49',
            address_name: '★★★☆☆',
            phone: '통돼지 김치두루찌개 (7,000원)',
            latlng: new daum.maps.LatLng(37.5687920,126.9756307)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=12811371',
            place_name: '미갈매기살',
            road_address_name: '서울 종로구 돈화문로11가길 7',
            address_name: '★★★★★',
            phone: '갈매기살 (12,000원)',
            latlng: new daum.maps.LatLng(37.5730083,126.9910887)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=17931775',
            place_name: '우리집',
            road_address_name: '서울 종로구 계동길 17',
            address_name: '★★★★★',
            phone: '닭갈비 (7,000원 ~ 10,000원)',
            latlng: new daum.maps.LatLng(37.5781114, 126.9866220)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=17931775',
            place_name: '우리집',
            road_address_name: '서울 종로구 계동길 17',
            address_name: '★★★★★',
            phone: '닭갈비 (7,000원 ~ 10,000원)',
            latlng: new daum.maps.LatLng(37.5781114, 126.9866220)
        },{
            place_url: 'https://store.naver.com/restaurants/detail?id=37591684',
            place_name: '강촌 숯불닭갈비',
            road_address_name: '서울 종로구 종로9길 18',
            address_name: '★★★★★',
            phone: '숯불닭갈비 (11,000원)',
            latlng: new daum.maps.LatLng(37.5781114, 126.9866220)
        }
    
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = '/images/markerStar_g_b.png';

    for (var i = 0; i < positions.length; i ++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new daum.maps.Size(30, 44);

        // 마커 이미지를 생성합니다
        var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new daum.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            image : markerImage // 마커 이미지
        });
        daum.maps.event.addListener(marker, 'click', makeOverListener(map, marker, positions[i]));
    }

    function makeOverListener(map, marker, place) {
        return function() {

          if (place != selectedPlace) {

            selectedPlace = place

            map.setCenter(place.latlng);

            var content = '<div class="placeinfo"><a class="title_a" href="' +
                place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

            if (place.road_address_name) {
              content += '<span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                         '<span class="jibun" title="' + place.address_name + '">(별점 : ' + place.address_name + ')</span>';
            }else{
              content += '<span title="' + place.address_name + '">' + place.address_name + '</span>';
            }

            content += '<span class="tel">' + place.phone + '</span></div><div class="after"></div>';
            contentNode.innerHTML = content;
            placeOverlay.setPosition(place.latlng);
            placeOverlay.setMap(map);
          } else {
            selectedPlace = null;
            placeOverlay.setMap(null);
          }
        };
    }
