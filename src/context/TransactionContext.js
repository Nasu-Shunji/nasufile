//import { ethers } from "ethers";
//import { createContext } from "react";
import { createContext, useEffect ,useState} from 'react';
import { contractABI, contractAddress } from "../utils/connect";

//reactの中にある関数を読む。コンテキストを作れるようになる
export const TransactionContext = createContext();

const { ethers } = require("ethers");

//windows.ethereumをethereumと省略させる
const { ethereum } = window;

//スマートコントラクトを取得
const getSmartContract = () => {
    //Metamaskをインストールした状態で見れる
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //ユーザーのMetamasアカウントを認識＋署名をゲットする(署名をもとにコントラクトを取得)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    console.log(provider, signer, transactionContract);

    return transactionContract;
};

//ここに関数を記載していく(ウォレット連携等)
export const TransactionProvider = ({children}) => {
    //アカウントを保存するための変数,初期値は空の文字列, [インプット(保存される方？), セット]
    const [currentAccount, setCurrentAccount] = useState("");
    const [inputFormData, setInputFormData] = useState({
        adressTo: "",
        amount: "",
    });

    const handleChange = (e, name) => {
        //prevInputFormData→上記のaddressYo,amountの値、...スプレッド構文で準備、第２引数のname→main.jsの引数と同じ, adressTo,amountに文字が入れば引数に入る
        setInputFormData((prevInputFormData) => ({
            ...prevInputFormData,
             [name]: e.target.value,
        }));
    }

    //メタマスクウォレットと連携しているのかをまずは確認しよう
    const checkMetamaskWalletConnected = async () => {
        if (!ethereum) return alert("メタマスクをインストールして下さい");

        //メタマスクのアカウントIDを取得
        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
    };

    //メタマスクウォレットと連携する
    const connectWallet = async () => {
        if (!ethereum) return alert("メタマスクをインストールして下さい");

        //メタマスクを持っていれば接続を開始する
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        console.log(accounts[0])

        setCurrentAccount(accounts[0])
    };

    //実際に通過のやり取りをする
    const sendTransaction = async () => {
        if (!ethereum) return alert("メタマスクをインストールして下さい");
        console.log("sendTransaction");

        //inputFormData.addressTo, inputFormData.amountの省略
        const { addressTo, amount } = inputFormData

        //スマートコントラクトのaddToBlockChainの関数が使えるようになる
        const transactionContract = getSmartContract();
        const parsedAmont = ethers.utils.parseEther(amount);

        const transactionParameters = {
              from: currentAccount, // The user's active address.
              to: addressTo, // Required except during contract publications.
              value: parsedAmont._hex, // Only required to send ether to the recipient from the initiating external account.
              gas: "0x2710" // Customizable by the user during MetaMask confirmation.
            };

            const txHash = await ethereum.request({
                 method: 'eth_sendTransaction',
                 params: [transactionParameters], 
            });

            //スマートコントラクトの処理を実行し、実際に送金を送る
            const transactionHash = await transactionContract.addToBlockChain(
                addressTo,
                parsedAmont
            );
            console.log(`ロード中・・・${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`送金に成功！${transactionHash.hash}`)
        };
    
    //第２引数に依存関係を示す。変数の更新に対して関数()checkMetamaskWalletConnected()を呼ぶ。今回は空だから１回
    useEffect(() => {
        checkMetamaskWalletConnected();
    }, []);

    //childrenはTransactionContextで設定した関数・変数をいつでも使用可能
    return (
        <TransactionContext.Provider value={{connectWallet, sendTransaction, handleChange, inputFormData}}>
            {children} 
        </TransactionContext.Provider>
    );
};
