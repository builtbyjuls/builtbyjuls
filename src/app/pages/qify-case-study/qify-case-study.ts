import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

type QifyPhase = 'phase0' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5' | 'next';

@Component({
  selector: 'app-qify-case-study',
  imports: [RouterLink],
  templateUrl: './qify-case-study.html',
  styleUrl: './qify-case-study.scss',
})
export class QifyCaseStudy implements OnInit {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  selectedPhase: QifyPhase = 'phase5';

  selectPhase(phase: QifyPhase): void {
    this.selectedPhase = phase;
  }

  ngOnInit(): void {
    const description =
      'Q-ify is an unlaunched synthetic Java backend exploring a private-sector pasuyo marketplace for permitted, transferable queues. Phase 5 adds OIDC access tokens and owner-scoped workflow access.';

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Q-ify Phase 5 Backend Case Study | Julius Lapugot',
    });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://builtbyjuls.com/projects/q-ify' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Q-ify Phase 5 Backend Case Study | Julius Lapugot',
    });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:image:width'");
    this.meta.removeTag("property='og:image:height'");
    this.meta.removeTag("property='og:image:alt'");
    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("name='twitter:image:alt'");
    this.setCanonicalUrl('https://builtbyjuls.com/projects/q-ify');
  }

  private setCanonicalUrl(url: string): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', url);
  }
}
