import { FormData } from '@/components/RecruitmentForm';

class FormDraftDatabase {
  private readonly STORAGE_KEY = 'ieee_recruitment_drafts';

  private getStorageKey(sessionId: string): string {
    return `${this.STORAGE_KEY}_${sessionId}`;
  }

  saveDraft(sessionId: string, formData: Partial<FormData>) {
    try {
      const storageKey = this.getStorageKey(sessionId);
      const dataToStore = {
        formData,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }

  loadDraft(sessionId: string): Partial<FormData> | null {
    try {
      const storageKey = this.getStorageKey(sessionId);
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.formData || null;
      }
      
      return null;
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  }

  deleteDraft(sessionId: string) {
    try {
      const storageKey = this.getStorageKey(sessionId);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  }

  // Clean up old drafts (older than 7 days)
  cleanupOldDrafts() {
    try {
      const keys = Object.keys(localStorage);
      const draftKeys = keys.filter(key => key.startsWith(this.STORAGE_KEY));
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      draftKeys.forEach(key => {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const lastUpdated = new Date(parsed.lastUpdated);
            if (lastUpdated < sevenDaysAgo) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            // If parsing fails, remove the corrupted entry
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Error cleaning up old drafts:', error);
    }
  }
}

export const formDraftDB = new FormDraftDatabase();

// Clean up old drafts on module load
if (typeof window !== 'undefined') {
  formDraftDB.cleanupOldDrafts();
} 