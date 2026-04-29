import type { PodMember } from '@/data/podDashboardMock'

interface WorkloadBalanceProps {
  members: PodMember[]
  onMemberClick: (memberId: string) => void
}

const LOAD_LABELS = {
  available:  'Available',
  balanced:   'Balanced',
  overloaded: 'Overloaded',
}

export function WorkloadBalance({ members, onMemberClick }: WorkloadBalanceProps) {
  return (
    <div className="ms-pod-balance">
      <div className="ms-pod-balance__heading">Workload Balance</div>
      {members.length === 0 ? (
        <p className="ms-pod-balance__empty">No pod members found for this pod.</p>
      ) : (
        <div className="ms-pod-balance__grid">
          {members.map((member) => (
            <div
              key={member.id}
              className={`ms-pod-balance__card ms-pod-balance__card--${member.loadState}`}
              role="button"
              tabIndex={0}
              aria-label={`${member.name}, ${member.activeTaskCount} active tasks, ${LOAD_LABELS[member.loadState]}. Click to filter queue.`}
              onClick={() => onMemberClick(member.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onMemberClick(member.id)
                }
              }}
            >
              <div className="ms-pod-balance__name">{member.name}</div>
              <div className="ms-pod-balance__role">{member.role}</div>
              <div className="ms-pod-balance__count">{member.activeTaskCount}</div>
              <div className="ms-pod-balance__count-label">active tasks</div>
              <span className={`ms-pod-balance__badge ms-pod-balance__badge--${member.loadState}`}>
                {LOAD_LABELS[member.loadState]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
