import { NextResponse } from 'next/server';
import type { PolicyRecommendation } from '@/app/types/policy';

export async function GET() {
  const recommendations: PolicyRecommendation[] = [
    {
      id: '1',
      name: 'Premium Health Plus',
      type: 'health',
      coverage: 1000000,
      monthlyPremium: 350,
      confidenceScore: 92,
      justification: 'Based on your age and health history, this comprehensive plan offers optimal coverage with preventive care benefits.',
      features: ['Preventive Care', '24/7 Telemedicine', 'Prescription Coverage', 'Mental Health Support', 'Dental & Vision']
    },
    {
      id: '2',
      name: 'Term Life Pro',
      type: 'life',
      coverage: 500000,
      monthlyPremium: 45,
      confidenceScore: 88,
      justification: 'Given your family status and income level, this term life policy provides adequate protection at an affordable rate.',
      features: ['30-year term', 'Level Premiums', 'Convertible Option', 'Accelerated Death Benefit', 'Disability Waiver']
    },
    {
      id: '3',
      name: 'Home Shield Elite',
      type: 'property',
      coverage: 750000,
      monthlyPremium: 125,
      confidenceScore: 95,
      justification: 'Based on your home value and location, this policy offers comprehensive coverage including natural disaster protection.',
      features: ['Natural Disaster Coverage', 'Personal Property Protection', 'Liability Coverage', 'Additional Living Expenses', 'Home Business Coverage']
    },
    {
      id: '4',
      name: 'Family Health Guardian',
      type: 'health',
      coverage: 2000000,
      monthlyPremium: 550,
      confidenceScore: 94,
      justification: 'Perfect for families, this plan includes comprehensive coverage for all family members with additional pediatric benefits.',
      features: ['Family Coverage', 'Pediatric Dental', 'Maternity Care', 'Wellness Programs', 'International Coverage']
    },
    {
      id: '5',
      name: 'Universal Life Flex',
      type: 'life',
      coverage: 1000000,
      monthlyPremium: 150,
      confidenceScore: 87,
      justification: 'This flexible universal life policy combines lifetime coverage with investment opportunities.',
      features: ['Lifetime Coverage', 'Cash Value Growth', 'Flexible Premiums', 'Investment Options', 'Policy Loans']
    },
    {
      id: '6',
      name: 'Condo Master Shield',
      type: 'property',
      coverage: 400000,
      monthlyPremium: 85,
      confidenceScore: 91,
      justification: 'Tailored for condo owners, this policy covers your unit and personal belongings with specific HOA considerations.',
      features: ['Interior Coverage', 'Loss Assessment', 'Personal Property', 'Liability Protection', 'Water Damage']
    },
    {
      id: '7',
      name: 'Senior Health Complete',
      type: 'health',
      coverage: 750000,
      monthlyPremium: 425,
      confidenceScore: 96,
      justification: 'Designed for seniors, this plan includes enhanced coverage for age-specific health needs and prescription drugs.',
      features: ['Medicare Supplement', 'Prescription Coverage', 'Specialist Care', 'Home Healthcare', 'Medical Equipment']
    },
    {
      id: '8',
      name: 'Business Life Secure',
      type: 'life',
      coverage: 2000000,
      monthlyPremium: 200,
      confidenceScore: 89,
      justification: 'Ideal for business owners, this policy includes key person coverage and business continuation benefits.',
      features: ['Key Person Coverage', 'Buy-Sell Agreement', 'Business Continuation', 'Estate Planning', 'Executive Bonus']
    },
    {
      id: '9',
      name: 'Rental Property Guard',
      type: 'property',
      coverage: 600000,
      monthlyPremium: 175,
      confidenceScore: 93,
      justification: 'Specialized coverage for rental property owners, including tenant damage and loss of rental income protection.',
      features: ['Rental Income Loss', 'Tenant Damage', 'Liability Coverage', 'Building Code Coverage', 'Multiple Properties']
    },
    {
      id: '10',
      name: 'Young Professional Health',
      type: 'health',
      coverage: 500000,
      monthlyPremium: 275,
      confidenceScore: 90,
      justification: 'Tailored for young professionals, this plan balances essential coverage with preventive care and digital health services.',
      features: ['Digital Health', 'Fitness Benefits', 'Mental Health', 'Preventive Care', 'Travel Coverage']
    }
  ];

  return NextResponse.json(recommendations);
}