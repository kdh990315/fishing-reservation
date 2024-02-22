export const headerMenu = [
	{
		mainMenu: '바다낚시',
		subMenu: [
			{ sub: '선상낚시' },
			{ sub: '좌대낚시' },
			{ sub: '선외기낚시' },
			{ sub: '바다체험낚시' },
		]
	},
	{
		mainMenu: '민물낚시',
		subMenu: [
			{ sub: '저수지낚시' },
			{ sub: '좌대낚시' },
			{ sub: '방갈로낚시' },
		]
	},
	{
		mainMenu: '커뮤니티',
		subMenu: [
			{ sub: '실시간 조황' },
			{ sub: '이벤트' },
			{ sub: '대회' },
			{ sub: '공지사항' },
		]
	},
]

export const categoryData = [
	{
		src: '/images/category/category_icon1.png',
		alt: '카테고리 아이콘 선상낚시',
		title: '선상낚시',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon2.png',
		alt: '카테고리 아이콘 체험낚시',
		title: '체험낚시',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon3.png',
		alt: '카테고리 아이콘 좌대낚시',
		title: '좌대낚시',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon4.png',
		alt: '카테고리 아이콘 낚시 배우기',
		title: '낚시 배우기',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon5.png',
		alt: '카테고리 아이콘 민물낚시',
		title: '민물낚시',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon6.png',
		alt: '카테고리 아이콘 낚시 포인트',
		title: '낚시 포인트',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon7.png',
		alt: '카테고리 아이콘 낚시 대회',
		title: '낚시 대회',
		link: '/ShipList'
	},
	{
		src: '/images/category/category_icon8.png',
		alt: '카테고리 아이콘 이벤트',
		title: '이벤트',
		link: '/ShipList'
	},
];

export const HotPicksData = [
	{
		fishName: '감성돔',
		how: '흘림/찌 낚시',
		location: '동해/남해'
	},
	{
		fishName: '갑오징어 / 쭈꾸미',
		how: '루어낚시',
		location: '서해'
	},
	{
		fishName: '대삼치',
		how: '지깅/생미끼 낚시',
		location: '동해/남해'
	},
	{
		fishName: '농어',
		how: '루어/외수질 생미끼 낚시',
		location: '남해/서해'
	},
	{
		fishName: '참돔',
		how: '타이라바/생미끼 낚시',
		location: '남해/서해'
	},
	{
		fishName: '대광어',
		how: '다운샷/생미끼 낚시',
		location: '남해/서해'
	},
];

export const allFish = [
	{
		title: '돔류',
		fishName: [
			{ id: 'f1', name: '참돔' },
			{ id: 'f2', name: '감성돔' },
			{ id: 'f3', name: '돌돔' },
			{ id: 'f4', name: '벵에돔' },
		]
	},
	{
		title: '두족류',
		fishName: [
			{ id: 'f5', name: '쭈꾸미' },
			{ id: 'f6', name: '갑오징어' },
			{ id: 'f7', name: '문어' },
			{ id: 'f8', name: '무늬오징어' },
			{ id: 'f9', name: '한치' },
			{ id: 'f10', name: '오징어' },
			{ id: 'f11', name: '낙지' },
		]
	},
	{
		title: '농어과',
		fishName: [
			{ id: 'f12', name: '우럭' },
			{ id: 'f13', name: '광어' },
			{ id: 'f14', name: '농어' },
			{ id: 'f15', name: '노래미' },
			{ id: 'f16', name: '삼치' },
			{ id: 'f17', name: '방어' },
			{ id: 'f18', name: '부시리' },
			{ id: 'f19', name: '갈치' },
			{ id: 'f20', name: '열기' },
			{ id: 'f21', name: '전갱이' },
			{ id: 'f22', name: '망둥어' },
			{ id: 'f23', name: '고등어' },
			{ id: 'f24', name: '붉바리' },
			{ id: 'f25', name: '대구' },
			{ id: 'f26', name: '백조기' },
			{ id: 'f27', name: '볼락' },
		]
	}
];

export const fishingType = [
	{
		id: 1,
		value: '생미끼 외수질',
	},
	{
		id: 2,
		value: '침선',
	},
	{
		id: 3,
		value: '타이라바',
	},
	{
		id: 4,
		value: '팁런',
	},
	{
		id: 5,
		value: '지깅',
	},
	{
		id: 6,
		value: '다운샷',
	},
	{
		id: 7,
		value: '흘림 찌낚시',
	},
	{
		id: 8,
		value: '어초',
	},
]

export const location = [
	{
		id: 1,
		value: '경기',
	},
	{
		id: 2,
		value: '전북',
	},
	{
		id: 3,
		value: '전남',
	},
	{
		id: 4,
		value: '충남',
	},
	{
		id: 5,
		value: '충북',
	},
	{
		id: 6,
		value: '경남',
	},
	{
		id: 7,
		value: '경북',
	},
	{
		id: 8,
		value: '강원',
	},
	{
		id: 9,
		value: '인천',
	},
	{
		id: 10,
		value: '제주',
	},
]