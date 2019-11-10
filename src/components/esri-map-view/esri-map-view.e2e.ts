import { newE2EPage } from '@stencil/core/testing';

describe('esri-map-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<esri-map-view></esri-map-view>');

    const element = await page.find('esri-map-view');
    expect(element).toHaveClass('hydrated');
  });
});
