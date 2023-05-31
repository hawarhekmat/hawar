"use client";

import {
  Page,
  Document,
  Image,
  Text,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    minHeight: "100",
  },
  title: {
    fontSize: 24,
    textAlign: "right",
    margin: 8,
    fontFamily: "Oswald",
  },
  image: {
    width: "100%",
    height: "200px",
  },
  right: {
    textAlign: "left",
    margin: 12,
    fontSize: 14,
    fontFamily: "Times-Roman",
  },
  center: {
    fontSize: 24,
    textAlign: "center",
    margin: 8,
    color: "red",
    fontFamily: "Oswald",
  },
});

const PDF = ({ data }: { data?: any[] }) => (
  <Document author="Hawar Hekmat" creator="Hawar Hekmat">
    {data?.map((item: any) => (
      <Page key={item._id} size={"A5"}>
        <Image style={styles.image} src={item.companyLogo} />
        <Text style={styles.center}>{item.driverID}</Text>
        <Text style={styles.title}>{item.company}</Text>
        <Text style={styles.title}>{item.products}</Text>
        <Text style={styles.title}>
          {item.month}/{item.dayOfMonth}/{item.year}
        </Text>
        <Text style={styles.title}>{item.time}</Text>
        <Text style={styles.title}>{item.drivers}</Text>
        <Text style={styles.title}>{item.carNumber}</Text>
        <Text style={styles.right}>Mark</Text>
      </Page>
    ))}
  </Document>
);

export default PDF;
