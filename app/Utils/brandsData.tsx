const brandsData = [
	{
		name: "Sagney",
		onBoardLogoUrl: require("../../assets/images/sagney-logo-dark.png"),
		deviceHeaderLogoUrl: require("../../assets/images/sagney-logo-white.png"),
		products: [
			{
				name: {
					en: "Puffer Jacket",
					fr: "Puffer Jacket(fr)",
				},
				productImageUrl: {
					men: require("../../assets/images/sagney-puffer-jacket-men.png"),
					women: require("../../assets/images/sagney-puffer-jacket-women.png"),
				},
				headerImageUrl: {
					men: require("../../assets/images/heatlover-puffer-jacket-model-men.png"),
					women: require("../../assets/images/heatlover-puffer-jacket-model-women.png"),
				},
			},
			{
				name: {
					en: "Puffer Vest",
					fr: "Puffer Vest(fr)",
				},
				productImageUrl: {
					men: require("../../assets/images/sagney-puffer-jacket-men.png"),
					women: require("../../assets/images/sagney-puffer-jacket-women.png"),
				},
				headerImageUrl: {
					men: require("../../assets/images/heatlover-puffer-jacket-model-men.png"),
					women: require("../../assets/images/heatlover-puffer-jacket-model-women.png"),
				},
			},
		],
		supportLink: {
			en: "https://ewool.com/support",
			fr: "https://ewool.com/fr-CA/assistance",
		},
	},
	{
		name: "Brand 2",
		onBoardLogoUrl: require("../../assets/images/brand1-logo.png"),
	},
	{
		name: "Brand 3",
		onBoardLogoUrl: require("../../assets/images/brand2-logo.png"),
	},
];

export default brandsData;
