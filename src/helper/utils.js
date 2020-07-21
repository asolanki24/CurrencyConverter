import MappingData from './../data/currencymapping.json';
import directPrice from './../data/directpricemapping.json';
const baseUSD = "USD";
const directMap = "D";
const eurMAP = "EUR";
const invMap = "Inv";
export const getBaseMappings = (from, to) => {
    return MappingData.mapping.find((cMaps) => cMaps.source === from && cMaps.target === to) || baseUSD;
}

export const getDirectInvRate = (baseMap, source, target) => {
    if (baseMap === directMap) {
        return directPrice.find((cMap) => cMap.source === source && cMap.target === target).rate;
    }
    return 1 / directPrice.find((cMap) => cMap.target === source && cMap.source === target).rate;
}

export const getUSDRates = (source, target) => {
    let baseRateObj = directPrice.find((cMap) => cMap.source === source && cMap.target === baseUSD);
    if (!baseRateObj) {
        baseRateObj = directPrice.find((cMap) => cMap.source === baseUSD && cMap.target === source);
    }
    let baseTargetObj = directPrice.find((cMap) => cMap.source === target && cMap.target === baseUSD);
    if (!baseTargetObj) {
        baseTargetObj = directPrice.find((cMap) => cMap.source === baseUSD && cMap.target === target);
    }
    return getFinalRate(source, target, baseRateObj, baseTargetObj);
}

const getFinalRate = (source, target, baseRateObj, baseTargetObj) => {
    if (baseRateObj === undefined || baseTargetObj === undefined) {
        return 0;
    }
    const sourceRate = baseRateObj !== undefined ? baseRateObj.rate : 0;
    const targetRate = baseTargetObj !== undefined ? baseTargetObj.rate : 0;
    if (baseRateObj.source === source && baseTargetObj.target === target) {
        return sourceRate * targetRate;
    } else if (baseRateObj.target === source && baseTargetObj.target === target) {
        return sourceRate / targetRate;
    } else if (baseRateObj.source === source && baseTargetObj.source === target) {
        return targetRate / sourceRate;
    } else if (baseRateObj.target === source && baseTargetObj.source === target) {
        return sourceRate * targetRate !== 0 ? 1 / (sourceRate * targetRate) : 0;
    }
    return 0;
}

export const getEURRates = (source, target) => {
    let isInverted = false;
    let baseRateObj = directPrice.find((cMap) => cMap.source === source && cMap.target === eurMAP);
    if (!baseRateObj) {
        baseRateObj = directPrice.find((cMap) => cMap.source === eurMAP && cMap.target === source);
        isInverted = true;
    }
    let baseTargetObj = directPrice.find((cMap) => cMap.source === target && cMap.target === eurMAP);
    if (!baseTargetObj) {
        baseTargetObj = directPrice.find((cMap) => cMap.source === eurMAP && cMap.target === target);
        isInverted = true;
    }
    return getFinalRate(source, target, baseRateObj, baseTargetObj);
}


export const getRates = (baseMap, from, to) => {
    let convertedRate = 0;
    switch (baseMap) {
        case baseUSD: {
            convertedRate = getUSDRates(from, to);
            break;
        }
        case directMap: {
            convertedRate = getDirectInvRate(baseMap, from, to);
            break;
        }
        case eurMAP: {
            convertedRate = getEURRates(from, to);
            break;
        } case invMap: {
            convertedRate = getDirectInvRate(baseMap, from, to);
            break;
        }
        default: {
        }
    }
    return convertedRate;
}

export const convertRates = (from, to) => {
    let convertedRate = 0;
    const baseMap = getBaseMappings(from, to);
    if (baseMap === baseUSD) {
        convertedRate = getRates(baseMap, from, to);
    } else {
        convertedRate = getRates(baseMap.base, from, to);
    }
    return convertedRate;
}
