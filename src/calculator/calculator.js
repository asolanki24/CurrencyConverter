import React, { useState } from 'react';
import Countries from './../data/countries.json';
import * as Utils from './../helper/utils.js';
export const Calculator = () => {
    const [from, setFrom] = useState("AUD");
    const [to, setTo] = useState("AUD");
    const [baseRate, setBaseRate] = useState(1);
    const [amount, setAmount] = useState(0);
    const [errorMsg, seterrorMsg] = useState(false);
    const [srcAmount, setSrcAmount] = useState(0);
    const onSourceCurrencyChange = (e) => {
        const fromValue = e.target.value;
        let rate = 1;
        if (fromValue !== to) {
            rate = Utils.convertRates(fromValue, to);
            seterrorMsg(rate === 0);
        }
        setFrom(fromValue);
        setBaseRate(rate);
        setAmount(0);
        setSrcAmount(0);

    }

    const onTargetCurrencyChange = (e) => {
        const toValue = e.target.value;
        let rate = 1;
        if (from !== toValue) {
            rate = Utils.convertRates(from, toValue);
            seterrorMsg(rate === 0);
        }
        setTo(toValue);
        setBaseRate(rate);
        setAmount(0);
        setSrcAmount(0);
    }
    const calculateAmount = (e) => {
        const finalAmount = (baseRate * e.target.value).toFixed(2);
        setAmount(finalAmount);
        setSrcAmount(e.target.value);
    }
    const getCountryOptions = (countries) => {
        return countries.map((country) => {
            return (
                <option key={country.name}>{country.name}</option>
            );
        });
    }
    return (
        <div className="maindv">
            <div className="row rowFirst">
                <label htmlFor="sourceCurrSeelct">Source :</label>
                <select data-testid="sourceCurrSeelct" onChange={(e) => onSourceCurrencyChange(e)}>
                    {getCountryOptions(Countries.countries)}
                </select>
                <label htmlFor="txtAmount">Enter Amount</label><input className="txtControl" value={srcAmount} data-testid="txtAmount" type="number" onChange={(e) => calculateAmount(e)}></input>
            </div>
            <div className="row">
                <label htmlFor="currToConvertSelect">Target  : </label>
                <select data-testid="currToConvertSelect" onChange={(e) => onTargetCurrencyChange(e)}>
                    {getCountryOptions(Countries.countries)}
                </select>
                <label htmlFor="txtConvAmount">Converted Amount</label> <input className="txtControl" data-testid="txtConvAmount" readOnly type="number" value={amount}></input>
            </div>
            <div id="dvError" className={errorMsg ? 'showErrDV' : 'hideErrDV'}>
                <span>Conversion not available!!</span>
            </div>
        </div>
    );
}

export default Calculator;