import React from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { getString } from "../../../utils/localization";
import SectionHeader from "../../components/common/SectionHeader";

function PrivacyPage(props: any) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <SectionHeader title={getString("ja", "footer", "privacy")} />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                <b>個人情報の利用目的</b>
              </Typography>
              <Typography variant="body1" align="justify">
                当サイトでは、メールでのお問い合わせ、サイト登録などの際に、名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただく場合がございます。
                これらの個人情報は質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>個人情報の第三者への開示</b>
              </Typography>
              <Typography variant="body1" align="justify">
                当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
                <br />
                - 本人のご了解がある場合
                <br />
                - 法令等への協力のため、開示が必要となる場合
                <br />
                ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
                <br />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>アクセス解析ツールについて</b>
              </Typography>
              <Typography variant="body1" align="justify">
                当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                <br />
                このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                この規約に関して、詳しくは
                <a href="https://marketingplatform.google.com/about/analytics/terms/jp/">
                  ここをクリックしてください。
                </a>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>広告の配信について</b>
              </Typography>
              <Typography variant="body1" align="justify">
                当サイトは第三者配信の広告サービス「Google Adsense
                グーグルアドセンス」を利用しています。
                <br />
                広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
                <br />
                Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「
                <a href="https://policies.google.com/technologies/ads?gl=jp">
                  広告 – ポリシーと規約 – Google
                </a>
                」をご覧ください。
                <br />
                第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>免責事項</b>
              </Typography>
              <Typography variant="body1" align="justify">
                当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                <br />
                当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
                <br />
                当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <b>プライバシーポリシーの変更について</b>
              </Typography>
              <Typography variant="body1" align="justify">
                当サイトは、個人情報に関して適用される当国の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
                <br />
                修正された最新のプライバシーポリシーは常に本ページにて開示されます。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PrivacyPage;
