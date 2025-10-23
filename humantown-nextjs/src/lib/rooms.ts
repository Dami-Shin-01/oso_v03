import { Room, RoomsData } from '@/types';
import roomsDataJson from './data/rooms-data.json';

/**
 * Get all rooms data
 */
export function getAllRooms(): Room[] {
  const data = roomsDataJson as RoomsData;
  return data.rooms;
}

/**
 * Get room by ID
 */
export function getRoomById(id: string): Room | undefined {
  const rooms = getAllRooms();
  return rooms.find(room => room.id === id);
}

/**
 * Get total room count
 */
export function getTotalRoomCount(): number {
  const data = roomsDataJson as RoomsData;
  return data.total_rooms;
}

/**
 * Get rooms by capacity
 */
export function getRoomsByCapacity(minCapacity: number): Room[] {
  const rooms = getAllRooms();
  return rooms.filter(room => room.capacity?.maximum >= minCapacity);
}

/**
 * Get rooms by size range
 */
export function getRoomsBySize(minPyeong: number, maxPyeong?: number): Room[] {
  const rooms = getAllRooms();
  return rooms.filter(room => {
    const size = room.size_pyeong || 0;
    if (maxPyeong) {
      return size >= minPyeong && size <= maxPyeong;
    }
    return size >= minPyeong;
  });
}
