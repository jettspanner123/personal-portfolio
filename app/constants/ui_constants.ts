export class ApplicationColor {
    public static current: ApplicationColor = new ApplicationColor();

    applicationBlack: string = `#000000`;
    appDarkBG: string = `#212121`;
    appBloodRedDark: string = `#7A0C0C`;
    appBloodRedLight: string = `#E01515`;

    appBlueDark: string = `#233060`;
    appBlueLight: string = `#4863C6`;

    appBrownDark: string = `#67301A`;
    appBrownLight: string = `#CD6034`;

    appCyanDark: string = `#165A5A`;
    appCyanLight: string = `#2FC0C0`;

    appGoldDark: string = `#67591A`;
    appGoldLight: string = `#CDB134`;

    appGreenDark: string = `#2D5A23`;
    appGreenLight: string = `#60C04B`;

    appGreyLight: string = `#ADADAD`;

    appLavaOne: string = `#DB4C27`;
    appLavaPurpleOne: string = `#985EC7`;
    appLavaPurpleTwo: string = `#5F2077`;
    appLavaTwo: string = `#EC6E4E`;

    appOrangeDark: string = `#94401F`;
    appOrangeLight: string = `#FA6C34`;

    appRedDark: string = `#7B2E22`;
    appRedLight: string = `#E1543E`;

    appThanosDark: string = `#3B2D59`;
    appThanosLight: string = `#7E60BF`;

    appWaterDark: string = `#20497F`;
    appWaterLight: string = `#3984E5`;
}


export class ApplicationLinearGradient {
    public static current: ApplicationLinearGradient = new ApplicationLinearGradient();

    appBackground: string = `linear-gradient(to bottom, ${ApplicationColor.current.appDarkBG} 0%, ${ApplicationColor.current.applicationBlack} 100%)`;
    appBackgroundInverted: string = `linear-gradient(to bottom, ${ApplicationColor.current.applicationBlack} 0%, ${ApplicationColor.current.appDarkBG} 100%)`;
    appRedGradient: string = `linear-gradient(to bottom, ${ApplicationColor.current.appRedLight} 0%, ${ApplicationColor.current.appRedDark} 100%)`;
    appRedPinkGradient: string = `linear-gradient(to bottom, #DA6C6C 0%, #AF3E3E 100%)`;
    appBlueGradientInverted: string = `linear-gradient(to bottom, ${ApplicationColor.current.appBlueDark} 0%, ${ApplicationColor.current.appBlueLight} 100%)`;
    appBlueGradient: string = `linear-gradient(to bottom, ${ApplicationColor.current.appBlueLight} 0%, ${ApplicationColor.current.appBlueDark} 100%)`;
    appTransparentGradient: string = `linear-gradient(to bottom, transparent 0%, transparent 0%)`;
    appGreenGradient: string = `linear-gradient(to bottom, ${ApplicationColor.current.appGreenLight} 0%, ${ApplicationColor.current.appGreenDark} 100%)`;
    appThanosGradient: string = `linear-gradient(to bottom, ${ApplicationColor.current.appThanosLight} 0%, ${ApplicationColor.current.appThanosDark} 100%)`;
    infosysHMSApp: string = `linear-gradient(135deg, #5F6CA0, #7886C7, #94A2DA)`

}