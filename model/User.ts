import mongoose, { Schema, models } from 'mongoose';

interface skillOffered {
  skill: string;
  level: string;
  skillId: string;
}

const SkillSchema = new Schema<skillOffered>({
  skill: {
    type: String,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  skillId: {
    type: String,
    unique: true
  }
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  skillsOffered: {
    type: [SkillSchema],
    default: []
  },
  skillsNeeded: {
    type: [SkillSchema],
    default: []
  },
  rating: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: ""
  }
});

export default models.User || mongoose.model('User', UserSchema);