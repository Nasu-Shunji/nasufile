//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    //仮想通貨の受け渡しのためのデータ構造
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
    }

    //配列を作り出す。TransferStruct型のtransactions変数
    TransferStruct[] transactions;

    //実際のイベントはここ
    event Transfer(address from, address receiver, uint amount);

    function addToBlockChain(address payable receiver, uint amount) public {
        //変数に書き込む→ブロックチェーンに書き込む
        transactions.push(TransferStruct(msg.sender, receiver, amount));

        //イベントの呼び出し
        emit Transfer(msg.sender, receiver, amount);
    }
}