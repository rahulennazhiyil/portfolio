import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // EmailJS Configuration
  private readonly SERVICE_ID = 'service_dujzahe';
  private readonly TEMPLATE_ID = 'template_9sngvrt'; // You'll need to create this template in EmailJS
  private readonly PUBLIC_KEY = '7UfZLI4FBKgE0OFvI'; // Get this from EmailJS dashboard

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.PUBLIC_KEY);
  }

  /**
   * Send contact form email using EmailJS
   * @param formData Contact form data
   * @returns Promise with success/error response
   */
  async sendEmail(formData: {
    from_name: string;
    from_email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'rahuleprofessional@gmail.com',
      });

      if (response.status === 200) {
        return {
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: any) {
      console.error('Email send error:', error);
      return {
        success: false,
        message:
          'Failed to send message. Please try again or email me directly at rahuleprofessional@gmail.com',
      };
    }
  }
}
