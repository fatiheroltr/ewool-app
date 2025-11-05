const brandsData = [
	{
		name: "Sagney",
		onBoardLogoUrl: require("../../assets/images/sagney-logo-dark.png"),
		deviceHeaderLogoUrl: require("../../assets/images/sagney-logo-white.png"),
		products: [
			{
				name: {
					en: "Heated jacket",
					fr: "Manteau chauffant",
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
					en: "Heated vest",
					fr: "Veste chauffante",
				},
				productImageUrl: {
					men: require("../../assets/images/sagney-vest.png"),
					women: require("../../assets/images/sagney-vest.png"),
				},
				headerImageUrl: {
					men: require("../../assets/images/sagney-vest-men.png"),
					women: require("../../assets/images/sagney-vest-women.png"),
				},
			},
			{
				name: {
					en: "Heated short",
					fr: "Short chauffant",
				},
				productImageUrl: {
					men: require("../../assets/images/sagney-short-men.png"),
					women: require("../../assets/images/sagney-short-women.png"),
				},
				headerImageUrl: {
					men: require("../../assets/images/sagney-short-model-men.png"),
					women: require("../../assets/images/sagney-short-model-women.png"),
				},
			},
		],
		supportLink: {
			en: "https://ewool.com/support",
			fr: "https://ewool.com/fr-CA/assistance",
		},
	},
];

export default brandsData;
