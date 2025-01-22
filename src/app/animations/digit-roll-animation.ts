import { animate, style, transition, trigger } from '@angular/animations';

//doesn't work properly!!!
export const digitRollAnimation = trigger('digitRollAnimation', [
  transition(':increment', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':decrement', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
]);
