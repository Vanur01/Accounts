"use client";

import React from "react";
import { PDFViewer, Page, Text, View, Document, StyleSheet, Font, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";

export interface QuotationType {
  title: string;
  number: string;
  date: string;
  dueDate: string;
  client: {
    name: string;
    gstin: string;
    address: string;
    contact: string;
    email: string;
  };
  items: Array<{
    name: string;
    description: string;
    qty: number;
    rate: number;
    discount: number;
    igst: number;
    amount: number;
    hsn: string;
    unit: string;
  }>;
  subtotal: number;
  discountType: string;
  discountValue: number;
  tax: number;
  shipping: number;
  roundOff: boolean;
  total: number;
  terms: string;
  notes: string;
  attachments: string[];
  signature: string | null;
}

export interface PhaseType {
  name: string;
  dueDate: string;
  amount: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    lineHeight: 1.4,
  },
  
  // Header Section
  headerSection: {
    marginBottom: 30,
    borderBottom: '2pt solid #1f2937',
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyInfo: {
    flex: 1,
    maxWidth: '45%',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  companyDetail: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 3,
  },
  quotationInfo: {
    alignItems: 'flex-end',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    border: '1pt solid #e5e7eb',
  },
  quotationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  quotationDetail: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 3,
  },
  
  // Client Section
  clientSection: {
    marginBottom: 25,
  },
  clientBox: {
    backgroundColor: '#f9fafb',
    border: '1pt solid #e5e7eb',
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clientDetail: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
  },
  clientValue: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  
  // Table Styles
  tableSection: {
    marginBottom: 25,
  },
  table: {
    border: '1pt solid #d1d5db',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e5e7eb',
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  
  // Item Table Columns
  colItem: { width: '15%', padding: 8, fontSize: 9 },
  colDescription: { width: '25%', padding: 8, fontSize: 9 },
  colQty: { width: '8%', padding: 8, fontSize: 9, textAlign: 'center' },
  colUnit: { width: '8%', padding: 8, fontSize: 9, textAlign: 'center' },
  colRate: { width: '10%', padding: 8, fontSize: 9, textAlign: 'right' },
  colDiscount: { width: '10%', padding: 8, fontSize: 9, textAlign: 'right' },
  colIgst: { width: '8%', padding: 8, fontSize: 9, textAlign: 'center' },
  colAmount: { width: '10%', padding: 8, fontSize: 9, textAlign: 'right' },
  colHsn: { width: '8%', padding: 8, fontSize: 9, textAlign: 'center' },
  
  // Phase Table Columns
  colPhase: { width: '40%', padding: 8, fontSize: 9 },
  colDueDate: { width: '30%', padding: 8, fontSize: 9, textAlign: 'center' },
  colPhaseAmount: { width: '30%', padding: 8, fontSize: 9, textAlign: 'right' },
  
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 9,
    color: '#ffffff',
  },
  
  // Summary Section
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  summaryBox: {
    backgroundColor: '#f8fafc',
    border: '1pt solid #e5e7eb',
    borderRadius: 8,
    padding: 15,
    width: '45%',
    alignSelf: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#4b5563',
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalRow: {
    borderTop: '1pt solid #d1d5db',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  
  // Terms and Notes
  termsNotesSection: {
    marginBottom: 20,
  },
  termsBox: {
    backgroundColor: '#fef3c7',
    border: '1pt solid #f59e0b',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  notesBox: {
    backgroundColor: '#dbeafe',
    border: '1pt solid #3b82f6',
    borderRadius: 8,
    padding: 12,
  },
  boxTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  boxContent: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  
  // Footer
  footerSection: {
    marginTop: 30,
    borderTop: '1pt solid #e5e7eb',
    paddingTop: 15,
  },
  signatureArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  signatureBox: {
    width: '30%',
    borderTop: '1pt solid #9ca3af',
    paddingTop: 5,
    textAlign: 'center',
  },
  signatureText: {
    fontSize: 9,
    color: '#6b7280',
  },
  
  // Attachments
  attachmentSection: {
    marginTop: 10,
  },
  attachmentItem: {
    fontSize: 9,
    color: '#2563eb',
    marginBottom: 2,
  },
  
  // Utility
  bold: { fontWeight: 'bold' },
  textCenter: { textAlign: 'center' },
  textRight: { textAlign: 'right' },
  mb4: { marginBottom: 4 },
  mt10: { marginTop: 10 },
});

function PremiumTemplate({ quotation, phases }: { quotation: QuotationType; phases: PhaseType[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>Your Company Name</Text>
              <Text style={styles.companyDetail}>123 Business Road, Business District</Text>
              <Text style={styles.companyDetail}>City, State - 123456</Text>
              <Text style={styles.companyDetail}>Phone: +91 123-456-7890</Text>
              <Text style={styles.companyDetail}>Email: info@company.com</Text>
              <Text style={styles.companyDetail}>Website: www.company.com</Text>
            </View>
            <View style={styles.quotationInfo}>
              <Text style={styles.quotationTitle}>QUOTATION</Text>
              <Text style={styles.quotationDetail}>Number: {quotation.number}</Text>
              <Text style={styles.quotationDetail}>Date: {quotation.date}</Text>
              <Text style={styles.quotationDetail}>Valid Until: {quotation.dueDate}</Text>
            </View>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.clientSection}>
          <View style={styles.clientBox}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.clientDetail}>
              Company: <Text style={styles.clientValue}>{quotation.client.name}</Text>
            </Text>
            <Text style={styles.clientDetail}>
              GSTIN: <Text style={styles.clientValue}>{quotation.client.gstin}</Text>
            </Text>
            <Text style={styles.clientDetail}>
              Address: <Text style={styles.clientValue}>{quotation.client.address}</Text>
            </Text>
            <Text style={styles.clientDetail}>
              Contact Person: <Text style={styles.clientValue}>{quotation.client.contact}</Text>
            </Text>
            <Text style={styles.clientDetail}>
              Email: <Text style={styles.clientValue}>{quotation.client.email}</Text>
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.tableSection}>
          <Text style={[styles.sectionTitle, styles.mb4]}>Items & Services</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colItem, styles.tableHeaderText]}>Item</Text>
              <Text style={[styles.colDescription, styles.tableHeaderText]}>Description</Text>
              <Text style={[styles.colQty, styles.tableHeaderText]}>Qty</Text>
              <Text style={[styles.colUnit, styles.tableHeaderText]}>Unit</Text>
              <Text style={[styles.colRate, styles.tableHeaderText]}>Rate</Text>
              <Text style={[styles.colDiscount, styles.tableHeaderText]}>Discount</Text>
              <Text style={[styles.colIgst, styles.tableHeaderText]}>IGST%</Text>
              <Text style={[styles.colAmount, styles.tableHeaderText]}>Amount</Text>
              <Text style={[styles.colHsn, styles.tableHeaderText]}>HSN</Text>
            </View>
            {quotation.items.map((item, idx) => (
              <View
                key={idx}
                style={
                  idx % 2 === 1
                    ? [styles.tableRow, styles.tableRowEven]
                    : [styles.tableRow]
                }
              >
                <Text style={[styles.colItem, styles.bold]}>{item.name}</Text>
                <Text style={styles.colDescription}>{item.description}</Text>
                <Text style={styles.colQty}>{item.qty}</Text>
                <Text style={styles.colUnit}>{item.unit}</Text>
                <Text style={styles.colRate}>₹{item.rate.toLocaleString()}</Text>
                <Text style={styles.colDiscount}>₹{item.discount.toLocaleString()}</Text>
                <Text style={styles.colIgst}>{item.igst}%</Text>
                <Text style={[styles.colAmount, styles.bold]}>₹{item.amount.toLocaleString()}</Text>
                <Text style={styles.colHsn}>{item.hsn}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Phase-wise Payment */}
        <View style={styles.tableSection}>
          <Text style={[styles.sectionTitle, styles.mb4]}>Payment Schedule</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colPhase, styles.tableHeaderText]}>Phase</Text>
              <Text style={[styles.colDueDate, styles.tableHeaderText]}>Due Date</Text>
              <Text style={[styles.colPhaseAmount, styles.tableHeaderText]}>Amount</Text>
            </View>
            {phases.map((phase, idx) => (
              <View
                key={idx}
                style={
                  idx % 2 === 1
                    ? [styles.tableRow, styles.tableRowEven]
                    : [styles.tableRow]
                }
              >
                <Text style={[styles.colPhase, styles.bold]}>{phase.name}</Text>
                <Text style={styles.colDueDate}>{phase.dueDate}</Text>
                <Text style={[styles.colPhaseAmount, styles.bold]}>₹{phase.amount.toLocaleString()}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.mt10, { fontSize: 9, color: '#6b7280' }]}>
            Total Payment Schedule: ₹{phases.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} 
            {" "}of ₹{quotation.total.toLocaleString()}
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={[styles.sectionTitle, styles.mb4]}>Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{quotation.subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>
                {quotation.discountType === "flat" 
                  ? `₹${quotation.discountValue.toLocaleString()}` 
                  : `${quotation.discountValue}%`}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (IGST)</Text>
              <Text style={styles.summaryValue}>₹{quotation.tax.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>₹{quotation.shipping.toLocaleString()}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{quotation.total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Terms and Notes */}
        <View style={styles.termsNotesSection}>
          <View style={styles.termsBox}>
            <Text style={styles.boxTitle}>Terms & Conditions</Text>
            <Text style={styles.boxContent}>{quotation.terms}</Text>
          </View>
          <View style={styles.notesBox}>
            <Text style={styles.boxTitle}>Notes</Text>
            <Text style={styles.boxContent}>{quotation.notes}</Text>
          </View>
        </View>

        {/* Attachments */}
        {quotation.attachments && quotation.attachments.length > 0 && (
          <View style={styles.attachmentSection}>
            <Text style={styles.boxTitle}>Attachments</Text>
            {quotation.attachments.map((file, i) => (
              <Text key={i} style={styles.attachmentItem}>📎 {file}</Text>
            ))}
          </View>
        )}

        {/* Footer with Signature */}
        <View style={styles.footerSection}>
          <View style={styles.signatureArea}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Authorized Signatory</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureText}>Date: {new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PremiumTemplate;