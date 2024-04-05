import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Set background to white
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 40, // Increased row height
  },
  tableCell: {
    paddingVertical: 8, // Adjust vertical padding
    paddingHorizontal: 4, // Adjust horizontal padding
    flexGrow: 1,
    justifyContent: 'center',
  },
  tableHeaderCell: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', // Center align header text
  },
  bodyText: {
    fontSize: 10,
    textAlign: 'center', // Center align body text
  },
  invisText: {
    fontSize: 10,
    color: '#FFFFFF'
  },
  rpeText: {
    fontSize: 10,
    letterSpacing: 4,
    textAlign: 'center', // Center align RPE text
  }
});

const WorkoutTablePdf = ({ cycleData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{cycleData?.name}</Text>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeaderCell, styles.headerText]}>Day</Text>
            <Text style={[styles.tableHeaderCell, styles.headerText]}>Exercise</Text>
            <Text style={[styles.tableHeaderCell, styles.headerText]}>Weight</Text>
            <Text style={[styles.tableHeaderCell, styles.headerText]}>Series</Text>
            <Text style={[styles.tableHeaderCell, styles.headerText]}>Repetitions</Text>
            <Text style={[styles.tableHeaderCell, styles.headerText]}>RPE</Text>
          </View>
          {cycleData?.days.map((day, dayIndex) => (
            day.map((exercise, exerciseIndex) => (
              <View style={styles.tableRow} key={`${dayIndex}-${exerciseIndex}`}>
                {exerciseIndex === 0 ?
                  <Text style={[styles.tableCell, styles.bodyText]}>
                    Day {dayIndex + 1}
                  </Text>
                  :
                  <Text style={[styles.tableCell, styles.invisText]}>
                    Day {dayIndex + 1}
                  </Text>
                }
                <Text style={[styles.tableCell, styles.bodyText]}>{exercise.name}</Text>
                <Text style={[styles.tableCell, styles.bodyText]}>{/* Blank cell for weight */}</Text>
                <Text style={[styles.tableCell, styles.bodyText]}>{exercise.series}</Text>
                <Text style={[styles.tableCell, styles.bodyText]}>{exercise.reps}</Text>
                <Text style={[styles.tableCell, styles.rpeText]}>{exercise.rpe}</Text>
              </View>
            ))
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default WorkoutTablePdf;
