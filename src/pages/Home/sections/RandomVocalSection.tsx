import { Card, CardContent, CircularProgress, List, Stack } from "@mui/material"
import DefaultSection from "../../../components/DefaultSection"
import ShuffleIcon from '@mui/icons-material/Shuffle'
import { SeiyuDocument } from "../../../utils/objects/seiyu"
import { getRandomInt } from "../../../utils/common"
import VocalSimpleItem from "../components/VocalSimpleItem"
import { useAppSelector } from "../../../app/hooks"
import { getCachedSeiyuList } from "../../../features/public/coreSlice"
import { getString } from "../../../utils/localization"

function RandomVocalSection() {
  const seiyu = useAppSelector(getCachedSeiyuList);
  let randomIndice: number[] = [];
  if(seiyu !== undefined) {
    if(seiyu.length > 4) {
      while(randomIndice.length < 4) {
        let tmp = getRandomInt(seiyu.length);
        if(randomIndice.indexOf(tmp) === -1)
          randomIndice.push(tmp);
      }
    } else {
      randomIndice = Array.from(Array(4).keys());
    }
  }
  // console.log(randomIndice);
  const list =
    seiyu !== undefined
      ? seiyu
          .filter((_, index) => randomIndice.indexOf(index) !== -1)
          .map((s) => SeiyuDocument.fromObject(s))
      : undefined;
    return (
      <DefaultSection label={getString("home","seiyuRng")} icon={<ShuffleIcon />}>
        <CardContent>
          <Stack spacing={1}>
            {list !== undefined ? (
              list.map((s, index) => <VocalSimpleItem key={`li-vs-${index}`} doc={s} />)
            ) : (
              <CircularProgress />
            )}
          </Stack>
        </CardContent>
      </DefaultSection>
    );
}

export default RandomVocalSection