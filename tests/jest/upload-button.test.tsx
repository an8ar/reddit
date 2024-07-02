import { render, screen } from '@testing-library/react';
import { UploadButton } from '~/components/upload-button';

const handleFileChange = jest.fn();

describe('testing upload file button', () => {
  it('should render the label and input elements', () => {
    render(<UploadButton handleFileChange={handleFileChange} />);

    const labelElement = screen.getByLabelText(/add/i);
    expect(labelElement).toBeInTheDocument();
  });
});
