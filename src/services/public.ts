import { apiRequest } from "./api"

function getLink(path: string): string {
    return `/public/${path}`;
}

const getIndexComponents = async () => (await apiRequest.get(getLink("index"))).data;

const getAllSeiyuBasic = async () => (await apiRequest.get(getLink("seiyu"))).data;

const getSeiyuProfile = async (uid: string) =>
  (await apiRequest.get(getLink(`seiyu/${uid}`))).data;

export default { getIndexComponents, getAllSeiyuBasic, getSeiyuProfile };
