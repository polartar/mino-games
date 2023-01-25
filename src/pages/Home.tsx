import * as React from "react";
import { useState, useEffect } from "react"
import {
  Box,
  Container,
} from "@mui/material";

import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { INft } from "../types/nft";
import NftItem from "../components/NftItem";

const DISPLAYED_IDS = [126, 244, 92, 37, 45, 375, 66, 102, 62, 52, 36, 17]
const BASE_URI = 'https://tunes.mypinata.cloud/ipfs/QmSXTdZb3wfFga4FGmV8AFnGY2JVoJAJY3GF54VxTeuLhZ/'

export default function Home() {
  const { account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<INft[]>([]);

  useEffect(() => {
    if (account) {
      setIsLoading(true);

      // get metadata of the token IDs
      const promises = DISPLAYED_IDS.map(id => {
        return axios.get(`${BASE_URI}${id}`);
      })

      Promise.all(promises).then(values => {
        const newValues = values.map((value: any) => ({ name: value.data.name, description: value.data.description, image: value.data.image }))
        setNfts(newValues);
        setIsLoading(false);
      });

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          flexWrap="wrap"
          maxWidth="1000px"
          margin="auto"
          height="500px"
        >
          {
            isLoading ? <div className="loading-spinner"></div>
              : <>
                {
                  nfts.map((nft: INft) => {
                    return (
                      <NftItem key={nft.name} nft={nft} />
                    )
                  })
                }
              </>
          }

        </Box>

      </Container>
    </React.Fragment>
  );
}
