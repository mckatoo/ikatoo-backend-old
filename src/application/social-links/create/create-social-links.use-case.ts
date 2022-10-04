import { ConflictError } from '@application/helpers/api-erros'
import { SocialLinksProps } from '@domain/social-links/social-links.entity'
import { SocialLinksRepositoryInterface } from '@domain/social-links/social-links.repository'

type CreateSocialLinksInput = SocialLinksProps & { id?: string }

export class CreateSocialLinksUseCase {
  constructor (private readonly repository: SocialLinksRepositoryInterface) {}

  async execute (input: CreateSocialLinksInput): Promise<void> {
    const socialLinksOfTheUser = await this.repository.getByUserId(input.user_id)
    const socialLinkExists = socialLinksOfTheUser.find(socialLink => socialLink.name === input.name)
    if (socialLinkExists != null) throw new ConflictError('This social-link already exists for this user')

    await this.repository.create(input)
  }
}
