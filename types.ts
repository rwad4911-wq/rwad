
export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'sport' | 'skill';
  imageUrl?: string;
}

export interface TeacherFeedback {
  teacherName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StudentProfile {
  name: string;
  age: number;
  hobby: string;
  bio: string;
}
