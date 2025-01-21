import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const totalAmountAnimation = trigger('totalAmountAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(
      '500ms ease-out',
      keyframes([
        style({ opacity: 0.5, transform: 'translateY(10px)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in',
      style({ opacity: 0, transform: 'translateY(-20px)' })
    ),
  ]),
]);
