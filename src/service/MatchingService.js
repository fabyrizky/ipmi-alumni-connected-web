import alumniData from '../data/alumniData';

class MatchingService {
  static async findMatches(userProfile, topN = 3) {
    try {
      // Create user profile string
      const userProfileString = `${userProfile.profession} ${userProfile.culturalBackground} ${userProfile.academicBackground} ${userProfile.interests}`;
      
      // Calculate similarity scores
      const matches = alumniData.map(alumni => {
        const alumniString = `${alumni.profession} ${alumni.culturalBackground} ${alumni.academicBackground} ${alumni.interests}`;
        const similarity = this.calculateSimilarity(userProfileString, alumniString);
        
        return {
          ...alumni,
          similarity
        };
      });

      // Sort by similarity and return top matches
      return matches
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topN)
        .filter(match => match.similarity > 0.1);
        
    } catch (error) {
      console.error('Error finding matches:', error);
      throw new Error('Failed to find matches');
    }
  }

  static calculateSimilarity(str1, str2) {
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];
    
    return intersection.length / union.length;
  }

  static async getAIInsights(userProfile, matches) {
    try {
      // Simulate AI insights
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        whyMatches: 'These matches show excellent alignment in professional interests and complementary expertise.',
        collaborations: 'Consider cross-industry projects, knowledge sharing sessions, and mentor-mentee relationships.',
        nextSteps: 'Reach out with specific collaboration ideas or suggest virtual coffee chats.'
      };
    } catch (error) {
      console.error('Error getting AI insights:', error);
      return null;
    }
  }
}

export default MatchingService;
