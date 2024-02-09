// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.20;

import { ERC5192 } from "./ERC5192/ERC5192.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MySBT is ERC5192 {
  bool private isLocked;
  using Counters
  for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  constructor(string memory _name, string memory _symbol, bool _isLocked)
    ERC5192(_name, _symbol, _isLocked)
  {
    isLocked = _isLocked;
  }
  function safeMint(address to, string memory uri) external {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
    if (isLocked) emit Locked(tokenId);
  }
}

