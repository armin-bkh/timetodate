const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api'

export interface DateRequest {
  id: number
  guestName: string
  datetime: string
  activity: string
  status: string
  message?: string
  createdAt: string
}

export interface CreateDatePayload {
  guestName?: string
  datetime: string
  activity: string
  message?: string
}

export async function createDateRequest(data: CreateDatePayload): Promise<DateRequest> {
  const res = await fetch(`${API_BASE}/dates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create date request')
  return res.json()
}

export async function getAllDates(): Promise<DateRequest[]> {
  const res = await fetch(`${API_BASE}/dates`)
  if (!res.ok) throw new Error('Failed to fetch dates')
  return res.json()
}

export async function getDateById(id: number): Promise<DateRequest> {
  const res = await fetch(`${API_BASE}/dates/${id}`)
  if (!res.ok) throw new Error('Date not found')
  return res.json()
}

export async function updateDate(id: number, data: Partial<DateRequest>): Promise<DateRequest> {
  const res = await fetch(`${API_BASE}/dates/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update date')
  return res.json()
}

export async function deleteDate(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/dates/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete date')
}
