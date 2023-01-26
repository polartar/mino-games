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

const BASE_URI = 'https://clonex-assets.rtfkt.com/'

export default function Home() {
  const { account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<INft[]>([]);

  useEffect(() => {
    const getMetadata = (tokenIds: number[]) => {
      // get metadata of the token IDs
      const promises = tokenIds.map(id => {
        return axios.get(`${BASE_URI}${id + 1}`);
      })

      Promise.all(promises).then(values => {
        const newValues: INft[] = values.map((value: any) =>
          ({ name: value.data.name, description: value.data.description, image: value.data.image })
        )
        setNfts(newValues);

        setIsLoading(false);
      });
    }
    if (account) {
      setIsLoading(true);

      getMetadata(Array.from(Array(10).keys()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])


  /**
   * Store the user state in the database
   * @param data user data that will be stored in the database
   */
  /*
  const storeUserState = (data: any) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user`, {
      ...data
    })
  }
  */

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
