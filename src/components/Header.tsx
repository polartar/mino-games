import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { AppBar, Box, Toolbar, Typography, Button, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { injectedConnector, walletconnect } from "../web3Connect/connectors";

const useStyles = makeStyles({
  main: {
    backgroundColor: "#6655f1!important",
    marginBottom: '20px'
  },
  button: {
    width: "100%",
    marginTop: "10px !important",
  },
  buttonConnect: {
    color: "#6655f1!important",
    background: "white!important"
  },
  accountInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ButtonAppBar() {
  const { chainId, account, activate, deactivate } = useWeb3React();
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if (chainId && (chainId !== 1 && chainId !== 5)) {
      alert("Please select Ethereum network");
      deactivate();
    }
  }, [chainId, deactivate]);

  const onConnectWallet = () => {
    setOpen(true);
  };

  const onConnectMetaMask = () => {
    activate(injectedConnector);
    handleClose();
  };

  const onConnectWalletConnect = () => {
    activate(walletconnect);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.main}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mino Games
          </Typography>

          {account === undefined ? (
            <Button variant="contained" size="medium" onClick={onConnectWallet} className={classes.buttonConnect}>
              Connect Wallet
            </Button>
          ) : (
            <div className={classes.accountInfo}>
              <Typography variant="subtitle1" component="p">
                {account}
              </Typography>

            </div>
          )}
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={onConnectMetaMask}
          >
            Connect MetaMask
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={onConnectWalletConnect}
          >
            Connect WalletConnect
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
