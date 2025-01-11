import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TokenArtifact from "./ABI/Ballot.json";
import contractAddress from "./ABI/contract-address.json";
import { parseName, parseBytes } from "./utils";
// import BasicTable from "./components/ProposalTable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const App = () => {
  const [token, setToken] = useState();
  const [chairperson, setChairperson] = useState("");
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState("");
  const [Addr, setAddr] = useState("");

  async function _initialize() {
    await _intializeEthers();
  }
  const _intializeEthers = async () => {
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _token = new ethers.Contract(
        contractAddress.Token,
        TokenArtifact.abi,
        _signer
      );

      // Check if the contract runner supports calling
      if (!_signer.call) {
        throw new Error(
          "Unsupported operation: Contract runner does not support calling"
        );
      }

      const newChairperson = await _token.chairperson();
      const newProposal = await _token.getAllProposals();

      setToken(_token);
      console.log(newProposal);
      setChairperson(newChairperson);
      setProposal(newProposal);
    } catch (error) {
      setError(`Failed to initialize ethers: ${error.message}`);
      console.error("Failed error", error.message);
    }
  };

  // Connects to the smart contract token id (check /contracts/contract-address.json)
  async function init() {
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const [selectedid] = await window.ethereum.request({
      method: "eth_chainId",
    });
    setAddr(selectedAddress);
    _initialize(selectedAddress);
  }

  const voteProposal = async (proposal) => {
    try{
      await token.vote(proposal);
    }catch(error){
      console.log(`error: ${error.revert.args[0]}`)
      setError(`${error.revert.args[0]}`)
    }
    
    
   };
  useEffect(() => {
    // When the page loads it will initialize the init function
    // that we need to connect the frontend with the smartcontract
    init();
  }, []);
  return (
    <div style={{ padding: "3rem 5rem" }}>
      <h1>Voting System</h1>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <div>
        <h4>chairperson: {chairperson}</h4>
        {/* {Addr && <h4>Connected:  {Addr}</h4>} */}
        <h2>Proposal:</h2>
        <div id="votes">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Names </TableCell>
                  <TableCell>Vote Count </TableCell>
                  <TableCell>Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {proposal.map((row,index) => 
                {
                  const name =parseName(parseBytes(row.name));;
                  const voteCount = row.voteCount._hex;
                  return(
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{name}</TableCell>
                    <TableCell>{voteCount != null ? Number(voteCount):0}</TableCell>
                    <TableCell>
                      <button style={{ marginLeft: '2em' }} onClick={() => voteProposal(index)}>Vote</button>
                    </TableCell>
                  </TableRow>)
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
