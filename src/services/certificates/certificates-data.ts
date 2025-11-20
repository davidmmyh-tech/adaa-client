import type {
  CertificateOrganizationsResponse,
  CertificateScheduleResponse,
  ChertificatesAnalyticsResponse,
  UserSummaryResponse
} from './types';
import type { CertificateTrack } from '@/schemas/types';
import api from '../api';

export function deleteCertificateSubmission(track: CertificateTrack) {
  return api.delete(`/api/certificates/${track}/answers`);
}

export function userSummary() {
  return api.get<UserSummaryResponse>(`/api/certificates/summary`);
}

export function getOrganzations(params: {
  query?: string;
  rank?: string;
  year?: number;
  page?: number;
  limit?: number;
}) {
  return api.get<CertificateOrganizationsResponse>(`/api/certificate/analytics`, { params });
}

export function getAnalytics() {
  return api.get<ChertificatesAnalyticsResponse>(`/api/certificate/analytics/organizations`);
}

export function getCertificatesSchedules() {
  return api.get<CertificateScheduleResponse>('/api/schedules');
}

export async function downloadTrackData(track: CertificateTrack) {
  return api.get<Blob>(`/api/certificates/${track}/download`, { responseType: 'blob' });
}
