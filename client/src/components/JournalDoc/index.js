import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  coverSection: {
    margin: 10,
    width: 500,
    height: 500,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  pageSection: {
    padding: 5,
  }
});

const JournalDoc = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.coverSection}>
        <Image src={data.coverImage} />
      </View>
        <Text>{data.desc}</Text>
    </Page>
    {data.pages.map((page, index) => {
      return (
        <Page size="A4" style={styles.page}>
        <View style={styles.pageSection}>
          <Text>{index+1}</Text>
          <Text>{page.content}</Text>
        </View>
      </Page>
      )
    })}
  </Document>
);

export default JournalDoc;